const request = require("supertest");

jest.mock("fs", () => ({
  readFileSync: jest.fn(() =>
    JSON.stringify([
      {
        id: "c1",
        title: "first",
        description: "",
        completed: false,
        createdAt: "2026-06-29T00:00:00.000Z",
      },
    ]),
  ),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  existsSync: jest.fn(() => true),
}));

const fs = require("fs");
const app = require("../index");

function createFsMock(overrides = {}) {
  return {
    readFileSync: jest.fn(() =>
      JSON.stringify([
        {
          id: "c1",
          title: "first",
          description: "",
          completed: false,
          createdAt: "2026-06-29T00:00:00.000Z",
        },
      ]),
    ),
    writeFileSync: jest.fn(),
    mkdirSync: jest.fn(),
    existsSync: jest.fn(() => true),
    ...overrides,
  };
}

function loadIsolatedApp({ fsMock, jokesRouter } = {}) {
  let isolatedApp;

  jest.resetModules();
  jest.doMock("fs", () => fsMock || createFsMock());

  if (jokesRouter) {
    jest.doMock("../routes/jokes", () => jokesRouter);
  }

  jest.isolateModules(() => {
    isolatedApp = require("../index");
  });

  return isolatedApp;
}

afterEach(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

// ─── Root ────────────────────────────────────────────────────────────────────

describe("Root", () => {
  test("GET / returns a welcome message envelope", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("message", "Todo API is running");
  });
});

// ─── Health ──────────────────────────────────────────────────────────────────

describe("GET /health", () => {
  test("returns ok with todosCount when file exists", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("status", "ok");
    expect(res.body.data).toHaveProperty("uptime");
    expect(res.body.data).toHaveProperty("timestamp");
    expect(res.body.data.todosCount).toBe(1);
  });

  test("returns ok with null todosCount when file does not exist", async () => {
    fs.existsSync.mockReturnValueOnce(false);
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.data.todosCount).toBeNull();
  });

  test("returns 500 when health check throws", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    fs.existsSync.mockReturnValueOnce(true);
    fs.readFileSync.mockImplementationOnce(() => {
      throw new Error("disk error");
    });
    const res = await request(app).get("/health");
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ─── Todos ───────────────────────────────────────────────────────────────────

describe("GET /todos", () => {
  test("returns list of todos", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe("GET /todos/:id", () => {
  test("returns todo by id", async () => {
    const res = await request(app).get("/todos/c1");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe("c1");
  });

  test("returns 404 for missing id", async () => {
    const res = await request(app).get("/todos/not-found");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /todos", () => {
  test("creates a todo with default completed and description", async () => {
    const res = await request(app).post("/todos").send({ title: "new todo" });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.title).toBe("new todo");
    expect(res.body.data.completed).toBe(false);
    expect(res.body.data.description).toBe("");
  });

  test("creates todo with provided completed and description", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "full todo", description: "some desc", completed: true });
    expect(res.status).toBe(201);
    expect(res.body.data.completed).toBe(true);
    expect(res.body.data.description).toBe("some desc");
  });

  test("returns 400 when title is missing", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ description: "no title" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("returns 400 when title is not a string", async () => {
    const res = await request(app).post("/todos").send({ title: 123 });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("PUT /todos/:id", () => {
  test("updates title, completed, and description", async () => {
    const post = await request(app).post("/todos").send({ title: "to update" });
    const id = post.body.data.id;

    const put = await request(app)
      .put(`/todos/${id}`)
      .send({ title: "updated", completed: true, description: "desc" });
    expect(put.status).toBe(200);
    expect(put.body.success).toBe(true);
    expect(put.body.data.title).toBe("updated");
    expect(put.body.data.completed).toBe(true);
    expect(put.body.data.description).toBe("desc");
  });

  test("keeps existing fields when body is empty", async () => {
    const post = await request(app).post("/todos").send({ title: "unchanged" });
    const id = post.body.data.id;

    const put = await request(app).put(`/todos/${id}`).send({});
    expect(put.status).toBe(200);
    expect(put.body.data.title).toBe("unchanged");
  });

  test("returns 404 for missing id", async () => {
    const res = await request(app)
      .put("/todos/non-existent")
      .send({ title: "x" });
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test("returns 400 for non-string title", async () => {
    const post = await request(app).post("/todos").send({ title: "temp" });
    const id = post.body.data.id;
    const res = await request(app).put(`/todos/${id}`).send({ title: 999 });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("DELETE /todos/:id", () => {
  test("removes a todo", async () => {
    const post = await request(app).post("/todos").send({ title: "to delete" });
    const id = post.body.data.id;

    const del = await request(app).delete(`/todos/${id}`);
    expect(del.status).toBe(200);
    expect(del.body.success).toBe(true);
    expect(del.body.data.id).toBe(id);
  });

  test("returns 404 for missing id", async () => {
    const res = await request(app).delete("/todos/non-existent");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe("Todos module bootstrap", () => {
  test("falls back to an empty list when persisted todos cannot be loaded", async () => {
    const isolatedApp = loadIsolatedApp({
      fsMock: createFsMock({
        readFileSync: jest.fn(() => {
          throw new Error("load failed");
        }),
      }),
    });

    const res = await request(isolatedApp).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });
});

// ─── Tips ────────────────────────────────────────────────────────────────────

describe("GET /tips", () => {
  test("returns all tips", async () => {
    const res = await request(app).get("/tips");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe("GET /tips/random", () => {
  test("returns a random tip", async () => {
    const res = await request(app).get("/tips/random");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("tip");
  });
});

describe("GET /tips/:id", () => {
  test("returns tip by id", async () => {
    const res = await request(app).get("/tips/1");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe("1");
  });

  test("returns 404 for unknown id", async () => {
    const res = await request(app).get("/tips/999");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ─── Random Joke ─────────────────────────────────────────────────────────────

describe("GET /randomjoke", () => {
  test("returns a random joke", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0);

    const res = await request(app).get("/randomjoke");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      id: "1",
      setup: "Why did the programmer quit his job?",
      punchline: "Because he didn't get arrays.",
    });
  });
});

describe("GET /randomjoke/:id", () => {
  test("returns joke by id", async () => {
    const res = await request(app).get("/randomjoke/1");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe("1");
    expect(res.body.data).toHaveProperty("setup");
    expect(res.body.data).toHaveProperty("punchline");
  });

  test("returns 404 for unknown joke id", async () => {
    const res = await request(app).get("/randomjoke/999");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Not found");
  });
});

// ─── App Middleware ──────────────────────────────────────────────────────────

describe("App middleware", () => {
  test("passes through responses that already use the success envelope", async () => {
    const express = require("express");
    const jokesRouter = express.Router();

    jokesRouter.get("/", (req, res) => {
      res.json({ success: true, data: { source: "pre-wrapped" } });
    });

    const isolatedApp = loadIsolatedApp({ jokesRouter });
    const res = await request(isolatedApp).get("/randomjoke");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: { source: "pre-wrapped" },
    });
  });

  test("uses the app error middleware for thrown route errors", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    const express = require("express");
    const jokesRouter = express.Router();

    jokesRouter.get("/", () => {
      throw new Error("boom");
    });

    const isolatedApp = loadIsolatedApp({ jokesRouter });
    const res = await request(isolatedApp).get("/randomjoke");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      success: false,
      error: "Internal Server Error",
    });
  });
});

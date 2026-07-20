const express = require("express");
const { randomUUID } = require("crypto");

const router = express.Router();

const fs = require("fs");
const path = require("path");

// Persistent-ish JSON file store (simple, for development). Will move to real DB later.
const DATA_PATH = path.join(__dirname, "..", "data", "todos.json");
function loadTodos() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveTodos(todos) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(todos, null, 2), "utf8");
}

// In-memory cache initialized from file
let todos = loadTodos();

// GET /todos - list all
router.get("/", (req, res) => {
  res.json(todos);
});

// GET /todos/:id - get one
router.get("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

// POST /todos - create
router.post("/", (req, res) => {
  const { title, completed = false, description = "" } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: 'Missing or invalid "title"' });
  }

  const todo = {
    id: randomUUID(),
    title,
    description,
    completed: !!completed,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  saveTodos(todos);
  res.status(201).json(todo);
});

// PUT /todos/:id - update
router.put("/:id", (req, res) => {
  const idx = todos.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const { title, description, completed } = req.body;
  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ error: 'Invalid "title"' });
  }

  const existing = todos[idx];
  const updated = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    description: description !== undefined ? description : existing.description,
    completed: completed !== undefined ? !!completed : existing.completed,
    updatedAt: new Date().toISOString(),
  };

  todos[idx] = updated;
  saveTodos(todos);
  res.json(updated);
});

// DELETE /todos/:id
router.delete("/:id", (req, res) => {
  const idx = todos.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const [removed] = todos.splice(idx, 1);
  saveTodos(todos);
  res.json(removed);
});

// POST /todos/bulk-delete - remove multiple todos by id
router.post("/bulk-delete", (req, res) => {
  const { ids } = req.body || {};
  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ error: 'Missing or invalid "ids" (expected string[])' });
  }

  const idSet = new Set(ids.filter((id) => typeof id === "string"));
  let deletedCount = 0;
  const remaining = [];
  for (const todo of todos) {
    if (idSet.has(todo.id)) {
      deletedCount += 1;
    } else {
      remaining.push(todo);
    }
  }

  todos = remaining;
  if (deletedCount > 0) saveTodos(todos);

  res.json({ deletedCount });
});

module.exports = router;

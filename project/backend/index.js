const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

async function init() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

app.get("/todos", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM todos ORDER BY id");
  res.json(rows);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });
  const { rows } = await db.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title],
  );
  res.status(201).json(rows[0]);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const { rows } = await db.query(
    "UPDATE todos SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *",
    [title, completed, id],
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM todos WHERE id=$1", [id]);
  res.status(204).end();
});

init()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize", err);
    process.exit(1);
  });

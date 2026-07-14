const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todos");
const tipsRouter = require("./routes/tips");
const jokesRouter = require("./routes/jokes");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Response wrapper middleware: returns consistent JSON envelopes
app.use((req, res, next) => {
  const oldJson = res.json.bind(res);
  res.json = (payload) => {
    // Error payloads (legacy routes send { error }) — wrap into envelope
    if (payload && payload.error !== undefined) {
      return oldJson({ success: false, error: payload.error });
    }

    // If payload already follows envelope, pass through
    if (payload && payload.success !== undefined) {
      return oldJson(payload);
    }

    // Normal data
    return oldJson({ success: true, data: payload });
  };

  res.error = (status, error) => {
    return res.status(status).json({ success: false, error });
  };

  next();
});

app.use("/todos", todosRouter);
app.use("/tips", tipsRouter);
app.use("/randomjoke", jokesRouter);

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  try {
    const DATA_PATH = path.join(__dirname, "data", "todos.json");
    let todosCount = null;

    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, "utf8");
      const parsed = JSON.parse(raw || "[]");
      if (Array.isArray(parsed)) todosCount = parsed.length;
    }

    return res.json({ status: "ok", uptime, timestamp, todosCount });
  } catch (err) {
    console.error("/health check failed", err);
    return res.error(500, "health check failed");
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;

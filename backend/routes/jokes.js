const express = require("express");

const router = express.Router();

// Small in-memory collection of jokes. Each joke has an `id`, `setup`, and `punchline`.
const jokes = [
  {
    id: "1",
    setup: "Why did the programmer quit his job?",
    punchline: "Because he didn't get arrays.",
  },
  {
    id: "2",
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None — it's a hardware problem.",
  },
  {
    id: "3",
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs.",
  },
  {
    id: "4",
    setup: "What's a programmer's favorite hangout place?",
    punchline: "The Foo Bar.",
  },
  {
    id: "5",
    setup: "Why was the JavaScript developer sad?",
    punchline: "Because he didn't Node how to Express himself.",
  },
];

// GET /randomjoke - return one random joke
router.get("/", (req, res) => {
  if (!jokes.length) return res.status(204).json({});
  const idx = Math.floor(Math.random() * jokes.length);
  res.json(jokes[idx]);
});

// GET /randomjoke/:id - find joke by id
router.get("/:id", (req, res) => {
  const joke = jokes.find((j) => j.id === req.params.id);
  if (!joke) return res.status(404).json({ error: "Not found" });
  res.json(joke);
});

module.exports = router;

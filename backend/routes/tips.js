const express = require("express");

const router = express.Router();

// A small curated list of AI coding tips. Keep these short and actionable.
const tips = [
  {
    id: "1",
    tip: "Write small, focused functions — keep responsibilities single and clear.",
  },
  {
    id: "2",
    tip: "Use meaningful variable and function names for readability.",
  },
  { id: "3", tip: "Write tests for edge cases, not just happy paths." },
  {
    id: "4",
    tip: "Prefer explicit types or checks when interfacing with AI outputs.",
  },
  {
    id: "5",
    tip: "Log inputs and outputs when experimenting with model prompts.",
  },
  {
    id: "6",
    tip: "Cache expensive model calls during development to save time and quota.",
  },
  {
    id: "7",
    tip: "Validate and sanitize all user-provided data before using it in prompts.",
  },
  {
    id: "8",
    tip: "Break large tasks into smaller steps and verify intermediate results.",
  },
  {
    id: "9",
    tip: "Keep prompt context minimal and relevant to reduce latency and cost.",
  },
  {
    id: "10",
    tip: "Pair AI suggestions with human review for safety-critical code changes.",
  },
];

// GET /tips - return all tips
router.get("/", (req, res) => {
  res.json(tips);
});

// GET /tips/random - return one random tip
router.get("/random", (req, res) => {
  if (!tips.length) return res.status(204).json({});
  const idx = Math.floor(Math.random() * tips.length);
  res.json(tips[idx]);
});

// GET /tips/:id - find tip by id
router.get("/:id", (req, res) => {
  const tip = tips.find((t) => t.id === req.params.id);
  if (!tip) return res.status(404).json({ error: "Not found" });
  res.json(tip);
});

module.exports = router;

const BASE =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE
    ? import.meta.env.VITE_API_BASE
    : "http://localhost:3000";

async function handleResponse(res) {
  const json = await res.json().catch(() => ({}));
  if (res.ok && json && json.success !== false) {
    // API wraps data in { success: true, data: ... }
    return json.data !== undefined ? json.data : json;
  }
  const err = (json && json.error) || res.statusText || "API error";
  throw new Error(err);
}

export async function fetchTodos() {
  const res = await fetch(`${BASE}/todos`);
  return handleResponse(res);
}

export async function createTodo(payload) {
  const res = await fetch(`${BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateTodo(id, payload) {
  const res = await fetch(`${BASE}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE}/todos/${id}`, { method: "DELETE" });
  return handleResponse(res);
}

export async function fetchTips() {
  const res = await fetch(`${BASE}/tips`);
  return handleResponse(res);
}

export async function fetchRandomTip() {
  const res = await fetch(`${BASE}/tips/random`);
  return handleResponse(res);
}

export async function fetchTip(id) {
  const res = await fetch(`${BASE}/tips/${id}`);
  return handleResponse(res);
}

export default {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  fetchTips,
  fetchRandomTip,
  fetchTip,
};

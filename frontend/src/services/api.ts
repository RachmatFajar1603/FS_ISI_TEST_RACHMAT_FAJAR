const API_URL = "http://localhost:8000";

interface Task {
  id: number;
  title: string;
  is_done: boolean;
  created_at: any;
}

const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error("Gagal memuat list tugas");
  return response.json();
};

const getTask = async (task_id: number) => {
  const response = await fetch(`${API_URL}/tasks/${task_id}`);
  if (!response.ok) throw new Error("Gagal memuat tugas");
  return response.json();
};

const createTask = async (task: Task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Gagal membuat tugas");
  return response.json();
};

const updateTask = async (task_id: number, task: Task) => {
  const response = await fetch(`${API_URL}/tasks/${task_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Gagal memperbarui tugas");
  return response.json();
};

const deleteTask = async (task_id: number) => {
  const response = await fetch(`${API_URL}/tasks/${task_id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Gagal menghapus tugas");
  return response.json();
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};

import { useEffect, useState } from "react";
import TaskForm from "../components/task-form";
import TaskList from "../components/task-list";
import api from "../services/api";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created_at: string;
}

interface BackendTask {
  id: number;
  title: string;
  is_done: boolean;
  created_at: string;
}

export default function Home() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const tasksData = await api.getTasks();

      const mappedTasks = tasksData.map((task: BackendTask) => ({
        id: task.id,
        title: task.title,
        isDone: task.is_done,
        created_at: task.created_at,
      }));

      const todo = mappedTasks.filter((task: Task) => !task.isDone);
      const done = mappedTasks.filter((task: Task) => task.isDone);

      setTodoTasks(
        todo.sort(
          (a: Task, b: Task) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      );
      setDoneTasks(
        done.sort(
          (a: Task, b: Task) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    } catch (error) {
      console.error("Error loading tasks:", error);
      setError("Gagal memuat tugas. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (title: string) => {
    try {
      await api.createTask({
        id: 0,
        title: title,
        is_done: false,
        created_at: new Date().toISOString(),
      });
      await loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdate = async (id: number, title: string, isDone: boolean) => {
    try {
      await api.updateTask(id, {
        id: id,
        title: title,
        is_done: isDone,
        created_at: editingTask?.created_at || new Date().toISOString(),
      });
      setEditingTask(null);
      await loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await api.updateTask(task.id, {
        id: task.id,
        title: task.title,
        is_done: !task.isDone,
        created_at: task.created_at,
      });
      await loadTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-center items-center mb-4">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 rounded">
            Memuat tugas...
          </div>
        )}
      </div>
      <h1 className="text-6xl mb-4 flex justify-center">Task Management</h1>

      <TaskForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={() => setEditingTask(null)}
        editingTask={editingTask}
      />

      <h2 className="text-lg font-semibold mt-6 mb-2">Ongoing Tasks</h2>
      <TaskList
        tasks={todoTasks}
        onToggle={(id) => {
          const task = todoTasks.find((t) => t.id === id);
          if (task) handleToggle(task);
        }}
        onEdit={(id) => {
          const task = todoTasks.find((t) => t.id === id);
          if (task) setEditingTask(task);
        }}
        onDelete={handleDelete}
      />

      <h2 className="text-lg font-semibold mt-6 mb-2">Completed Tasks</h2>
      <TaskList
        tasks={doneTasks}
        onToggle={(id) => {
          const task = doneTasks.find((t) => t.id === id);
          if (task) handleToggle(task);
        }}
        onEdit={(id) => {
          const task = doneTasks.find((t) => t.id === id);
          if (task) setEditingTask(task);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}

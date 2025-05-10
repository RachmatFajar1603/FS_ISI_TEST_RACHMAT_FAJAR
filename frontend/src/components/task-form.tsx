import { useEffect, useState } from "react";
import Button from "./ui/button";

type TaskFormProps = {
  onAdd: (title: string) => void;
  onUpdate: (task_id: number, title: string, is_done: boolean) => void;
  onCancel: () => void;
  editingTask: Task | null;
};

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created_at: any;
}

export default function TaskForm({
  onAdd,
  onUpdate,
  onCancel,
  editingTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle("");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    if (editingTask) {
      onUpdate(editingTask.id, title, editingTask.isDone);
    } else {
      onAdd(title);
    }
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <div className="flex flex-col w-full">
        <label htmlFor="task-input" className="mb-1 text-sm">
          Title
        </label>
        <input
          id="task-input"
          className="border rounded-xl px-4 py-2 w-full mb-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center gap-2">
        <Button
          className={`${
            editingTask 
              ? "bg-orange-400 hover:bg-orange-500" 
              : "bg-blue-300 hover:bg-blue-400"
          } text-black px-4 py-2 w-32 rounded-xl`}
          type="submit"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
        {editingTask && (
          <Button
            type="button"
            className="bg-red-300 text-black px-4 py-2 w-32 rounded-xl hover:bg-red-400"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

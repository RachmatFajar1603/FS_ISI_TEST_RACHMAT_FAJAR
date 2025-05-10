import { Circle, CircleCheck, CircleX, Pencil } from "lucide-react";
import Button from "./ui/button";
import { formatDate } from "../utils/date";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created_at: string;
  date?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className="flex flex-col py-2 bg-gray-300 rounded-xl px-4 mb-2">
      <div className="flex">
        <span className={`text-xl ${task.isDone ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </span>
        <Button onClick={() => onEdit(task.id)} className="ml-2">
          <Pencil size={20} />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button onClick={() => onDelete(task.id)}>
            <CircleX size={20} />
          </Button>
          <Button onClick={() => onToggle(task.id)}>
            {task.isDone ? <CircleCheck size={20} /> : <Circle size={20} />}
          </Button>
        </div>
      </div>
      <span className="text-sm text-gray-500">
        {task.date || formatDate(task.created_at)}
      </span>
    </div>
  );
}
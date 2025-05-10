import TaskItem from "./task-item";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  created_at: string;
  date?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Tidak ada task tersedia
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

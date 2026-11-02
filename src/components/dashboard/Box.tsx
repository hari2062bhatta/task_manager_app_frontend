import type { Task } from "../../types/Tasks.types";
import { MdTask } from "react-icons/md";

interface BoxProps {
  tasks: Task[];
}

const Box = ({ tasks }: BoxProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <MdTask size={28} className="text-green-500" />

        <div>
          <h1 className="text-lg font-semibold capitalize">
            {tasks[0]?.status || "Tasks"}
          </h1>
          <p className="text-gray-500 text-sm">
            Total: {tasks.length}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={String(task._id)}
            className="border rounded-md p-3 hover:bg-gray-50"
          >
            <h2 className="font-medium">{task.title}</h2>
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-gray-400">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Box;
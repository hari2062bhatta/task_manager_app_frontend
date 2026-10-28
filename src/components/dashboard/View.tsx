
import api from "../../config/api";
import { useState, useEffect } from "react";
import type { Task, TaskResponse } from "../../types/Tasks.types";

const View = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTask = async () => {
    const response = await api.get<TaskResponse>("/api/task/view");
    setTasks(response.data.data);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5">View Tasks</h2>

      {tasks.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Task ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{task._id.slice(15,-1).toUpperCase()}</td>
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.description}</td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 bg-white p-5 rounded border">
          No tasks assigned yet.
        </p>
      )}
    </div>
  );
};

export default View;

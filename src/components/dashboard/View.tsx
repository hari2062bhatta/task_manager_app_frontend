
import Swal from "sweetalert2";
import api from "../../config/api";
import { useState, useEffect } from "react";
import type { Task, TaskResponse, Edit } from "../../types/Tasks.types";

const View = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [edit, setEdit] = useState<Partial<Edit>>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });

  useEffect(() => {
    getTask();
  }, []);

  // Get all tasks
  const getTask = async () => {
    try {
      const response = await api.get<TaskResponse>("/api/task/view");
      setTasks(response.data.data);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to fetch tasks", "error");
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await api.delete(`/api/task/delete/${id}`);

      if (response.data.success) {
        await Swal.fire(
          "Deleted!",
          "Task deleted successfully",
          "success"
        );
        await getTask();
      } else {
        Swal.fire("Error", "Task deletion failed", "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Task deletion failed", "error");
    }
  };

  // Open edit modal with existing task data
  const openEdit = (task: Task) => {
    setEdit({
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });

    setIsOpen(true);
  };

  // Update task
  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!edit.title?.trim()) {
      Swal.fire("Warning", "Title is required", "warning");
      return;
    }

    try {
      const response = await api.put(
        `/api/task/update/${edit._id}`,
        {
          title: edit.title,
          description: edit.description,
          status: edit.status,
          priority: edit.priority,
        }
      );

      if (response.data.success) {
        await getTask();
        setIsOpen(false);

        Swal.fire(
          "Success",
          "Task updated successfully",
          "success"
        );
      } else {
        Swal.fire("Error", "Task update failed", "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Task update failed", "error");
    }
  };

  // Handle changes for input, textarea, and select
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative p-6">
      <h2 className="text-2xl font-semibold mb-5">
        View Tasks
      </h2>

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
                <tr
                  key={task._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 text-sm">
                    {task._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="p-3">{task.title}</td>

                  <td className="p-3">
                    {task.description}
                  </td>

                  {/* Priority */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "inprogress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.status === "inprogress"
                        ? "In Progress"
                        : task.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(task)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
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

      {/* Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-5">
              Update Task
            </h2>

            <form
              className="space-y-4"
              onSubmit={handleEdit}
            >
              {/* Title */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  value={edit.title ?? ""}
                  name="title"
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  onChange={handleChange}
                  value={edit.description ?? ""}
                  name="description"
                  placeholder="Enter task description"
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Status
                  </label>

                  <select
                    name="status"
                    value={edit.status ?? "pending"}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={edit.priority ?? "medium"}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Update Task
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;

import { useMemo } from "react";
import { MdAnalytics, MdTask } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import useTasks from "../../hooks/useTasks";
import Box from "./Box";

const Analytics = () => {
  const { tasks, error, isLoading } = useTasks();

  const pending = useMemo(
    () => tasks.filter((task) => task.status === "pending"),
    [tasks]
  );

  const progress = useMemo(
    () => tasks.filter((task) => task.status === "inprogress"),
    [tasks]
  );

  const done = useMemo(
    () => tasks.filter((task) => task.status === "completed"),
    [tasks]
  );

  if (isLoading) return <p className="p-6">Loading analytics...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load tasks.</p>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <MdAnalytics size={32} className="text-green-500" />
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <FaUser size={22} className="text-gray-500" />
          <div>
            <h2 className="font-semibold">Hari Bhatta</h2>
            <p className="text-sm text-gray-500">Task Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MdTask size={24} className="text-green-500" />
          <span>Total Tasks:</span>
          <span className="font-bold">{tasks.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Box tasks={pending} />
        <Box tasks={progress} />
        <Box tasks={done} />
      </div>
    </div>
  );
};

export default Analytics;
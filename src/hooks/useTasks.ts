import { useState, useEffect } from "react";
import type { Task, TaskResponse } from "../types/Tasks.types";
import api from "../config/api";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<TaskResponse>("/api/task/view");
      setTasks(response.data.data);
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.log(err);
    }
  };
  return {tasks,error,isLoading}
};


export default useTasks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://sphinix-backend.onrender.com/api/task/getTask?user=${localStorage.getItem("UserId")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const markAsComplete = async (taskId) => {
    try {
      const response = await axios.patch(
        "https://sphinix-backend.onrender.com/api/task/updateTask",
        { _id: taskId, status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the task list to reflect the completed status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "completed" } : task
        )
      );

      console.log("Task updated:", response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
            <p className="text-gray-600 text-sm">{task.description}</p>
            <p className="text-gray-500 text-xs">
              Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-xs">Priority: {task.priority}</p>
            <p className="text-gray-500 text-xs">Status: {task.status}</p>
            {task.status !== "completed" && (
              <button
                onClick={() => markAsComplete(task._id)}
                className="mt-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
              >
                Mark as Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

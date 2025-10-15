import { v4 as uid } from "uuid";

export default function tasksReducer(currentTasks, action) {
  switch (action.type) {
    case "addNewTask": {
      const newTask = {
        id: uid(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };

      const updatedTasks = [...currentTasks, newTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "checkTask": {
      const updatedTasks = currentTasks.map((t) => {
        if (t.id === action.payload.id) {
          const updatedTask = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTask;
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "deleteTask": {
      const updatedTasks = currentTasks.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "editTask": {
      const updatedTasks = currentTasks.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "getTasks": {
      const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
      if (tasksFromStorage) {
        return tasksFromStorage;
      }
      return tasksFromStorage;
    }
    default: {
      throw Error(`Unknown action (${action.type})`);
    }
  }
}

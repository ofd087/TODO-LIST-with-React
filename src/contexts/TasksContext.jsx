import { createContext, useReducer, useContext } from "react";
import tasksReducer from "../reducers/tasksResucer";

const TasksContext = createContext([]);

const TasksProvider = ({ children }) => {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);
  return (
    <TasksContext.Provider value={{ tasks: tasks, dispatch: tasksDispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};
export default TasksProvider;

import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AlertProvider } from "./contexts/AlertContext";
import TasksProvider from "./contexts/TasksContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },

  palette: {
    primary: {
      main: "#283593",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TasksProvider>
        <AlertProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#191b1f",
              direction: "rtl",
            }}
          >
            <TodoList />
          </div>
        </AlertProvider>
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;

// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";

// MUI Icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// React
import { useTasks } from "../contexts/TasksContext";
import { useAlert } from "../contexts/AlertContext";

export default function Todo({ task, openDeleteDialog, openEditDialog }) {
  const { tasks, dispatch } = useTasks();
  const { showHideAlert } = useAlert();

  // EVENT HANDLERS
  function handleCheckClick() {
    dispatch({ type: "checkTask", payload: task });

    showHideAlert("تم تحديث حالة المهمة بنجاح");
  }

  function handleDeleteClick() {
    openDeleteDialog(task);
  }

  function handleEditClick() {
    openEditDialog(task);
  }

  // ==== EVENT HANDLERS ====
  return (
    <>
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h4"
                style={{
                  textAlign: "right",
                  textDecoration: task.isCompleted && "line-through",
                }}
              >
                {task.title}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  textAlign: "right",
                  textDecoration: task.isCompleted && "line-through",
                }}
              >
                {task.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Button */}
              <Tooltip
                title={task.isCompleted ? "تراجع" : "وضع علامة مكتمل"}
                arrow
                enterDelay={300}
                leaveDelay={100}
              >
                <IconButton
                  className="icon-btn"
                  aria-label="check"
                  style={{
                    color: task.isCompleted ? "white" : "#8bc34a",
                    backgroundColor: task.isCompleted ? "#8bc34a" : "white",
                    border: "3px solid #8bc34a",
                  }}
                  onClick={handleCheckClick}
                >
                  {task.isCompleted ? <DoneAllIcon /> : <CheckIcon />}
                </IconButton>
              </Tooltip>
              {/* ==== Check Button ==== */}

              {/* Edit Button */}
              <Tooltip title="تعديل" arrow enterDelay={300} leaveDelay={100}>
                <IconButton
                  className="icon-btn"
                  aria-label="edit"
                  style={{
                    color: "#1769aa",
                    backgroundColor: "white",
                    border: "3px solid #1769aa",
                  }}
                  onClick={handleEditClick}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {/* ==== Edit Button ==== */}

              {/* Delete Button */}
              <Tooltip title="حذف" arrow enterDelay={300} leaveDelay={100}>
                <IconButton
                  className="icon-btn"
                  aria-label="delete"
                  style={{
                    color: "#b23c17",
                    backgroundColor: "white",
                    border: "3px solid #b23c17",
                  }}
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              {/* ==== Delete Button ==== */}
            </Grid>
            {/* ==== ACTION BUTTONS ==== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

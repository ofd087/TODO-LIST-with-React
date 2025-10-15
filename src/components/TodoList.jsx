// MUI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// React
import { useState, useEffect, useMemo } from "react";

// Components
import Todo from "./Todo";
import { useTasks } from "../contexts/TasksContext";
import { useAlert } from "../contexts/AlertContext";

// Others

export default function TodoList() {
  const { tasks, dispatch } = useTasks();
  const { showHideAlert } = useAlert();
  const [titleInput, setTitleInput] = useState("");
  const [displayedTasksType, setDisplayedTasksType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [dialogTask, setDialogTask] = useState(null);

  // Arrays Filteration (to click on completed and not completed buttons)
  const completedTasks = useMemo(() => {
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const notCompletedTaks = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);

  // =======

  let tasksToBeDisplayed = tasks;

  if (displayedTasksType === "completed") {
    tasksToBeDisplayed = completedTasks;
  } else if (displayedTasksType === "non-completed") {
    tasksToBeDisplayed = notCompletedTaks;
  }

  const tasksList = tasksToBeDisplayed.map((task) => {
    return (
      <Todo
        key={task.id}
        task={task}
        openDeleteDialog={openDeleteDialog}
        openEditDialog={openEditDialog}
      />
    );
  });

  useEffect(() => {
    dispatch({ type: "getTasks" });
  }, []);

  // Event Handlers
  function handleAddClick() {
    if (titleInput) {
      dispatch({
        type: "addNewTask",
        payload: {
          title: titleInput,
        },
      });

      setTitleInput("");
      showHideAlert("تمت الإضافة بنجاح");
    }
  }

  function handleDisplayedType(e) {
    setDisplayedTasksType(e.target.value);
  }

  function openDeleteDialog(task) {
    setDialogTask(task);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleteTask", payload: dialogTask });
    setShowDeleteDialog(false);
    showHideAlert("تم حذف المهمة بنجاح");
  }

  function openEditDialog(task) {
    setDialogTask(task);
    setShowEditDialog(true);
  }

  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleEditConfirm() {
    dispatch({ type: "editTask", payload: dialogTask });

    setShowEditDialog(false);

    showHideAlert("تم تعديل المهمة بنجاح");
  }

  return (
    <>
      {/* Edit Dialog */}
      <Dialog
        dir="rtl"
        open={showEditDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="العنوان"
            fullWidth
            variant="standard"
            value={dialogTask && dialogTask.title}
            onChange={(e) => {
              setDialogTask({ ...dialogTask, title: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            id="name"
            name="text"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTask && dialogTask.details}
            onChange={(e) => {
              setDialogTask({ ...dialogTask, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#555" }} onClick={handleEditDialogClose}>
            إلغاء
          </Button>
          <Button autoFocus onClick={handleEditConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== Edit Dialog ==== */}

      {/* Delete Dialog */}
      <Dialog
        // style={{ direction: "rtl" }}
        dir="rtl"
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد أنك تريد حذف هذه المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            بضغطك على حذف لن تستطيع التراجع مرة أخرى
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#555" }} onClick={handleDeleteDialogClose}>
            إلغاء
          </Button>
          <Button
            autoFocus
            style={{ color: "red" }}
            onClick={handleDeleteConfirm}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== Delete Dialog ==== */}

      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            marginTop: 10,
            marginBottom: 10,
            maxHeight: "85vh",
            overflowY: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              مهامي
            </Typography>
            <Divider />
            {/* FILTER BUTTON */}
            <ToggleButtonGroup
              color="primary"
              dir="ltr"
              style={{ marginTop: "30px" }}
              value={displayedTasksType}
              exclusive
              onChange={handleDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton value="non-completed">الغير مكتمل</ToggleButton>
              <ToggleButton value="completed">المكتمل</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* ==== FILTER BUTTON ==== */}

            {/* TASKS */}
            {tasksList}
            {/* ==== TASKS ==== */}

            {/* INPUT AND ADD BUTTON */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid xs={8}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ height: "100%" }}
                  onClick={handleAddClick}
                  disabled={titleInput == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/* ==== INPUT AND ADD BUTTON ==== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

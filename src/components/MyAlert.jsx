import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MyAlert({ open, message }) {
  return (
    <>
      <Snackbar open={open}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

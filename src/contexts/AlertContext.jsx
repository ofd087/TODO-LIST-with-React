import { createContext, useContext, useState } from "react";
import MyAlert from "../components/MyAlert";

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function showHideAlert(message) {
    setOpenAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setOpenAlert(false);
    }, 2000);
  }
  return (
    <AlertContext.Provider value={{ showHideAlert }}>
      <MyAlert open={openAlert} message={alertMessage} />

      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};

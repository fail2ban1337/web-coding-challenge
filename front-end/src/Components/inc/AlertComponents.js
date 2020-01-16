import React from "react";
import { Alert } from "@material-ui/lab";

const AlertComponents = ({ message, type }) => {
  return (
    <div>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

export default AlertComponents;

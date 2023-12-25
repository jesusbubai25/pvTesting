import React from "react";
import Button from "@mui/material/Button";
import "./ButtonsComp.css";

const ButtonsComp = (props) => {
  return (
    <Button
      variant={props?.type}
      style={{
        margin: "5px",
        height: "7vh",
        width: "7vw",
        color: "black",
        fontWeight: "bolder",
        backgroundColor: props?.buttonType === "primary" ? "#ed7d31" : "white",
      }}
      onClick={props?.onClick}
    >
      {props?.buttonText}
    </Button>
  );
};

export default ButtonsComp;

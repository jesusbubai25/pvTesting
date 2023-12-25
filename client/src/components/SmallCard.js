import { Button, Grid } from "@mui/material";
import React from "react";
import "./SmallCard.css";
import ButtonsComp from "./ButtonsComp";

const SmallCard = (props) => {
  return (
    <div className="small-card-style">
      <div>
        <h2 style={{ textAlign: "center", color: "#122b4f" }}>
          {props?.heading}
        </h2>
      </div>
      {props?.body?.map((item) => {
        return (
          <div>
            <h5 style={{ textAlign: "center" }}>{item}</h5>
          </div>
        );
      })}
      <div
        style={{
          display: "block",
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          style={{
            margin: "5px",
            height: "5vh",
            width: "5vw",
            color: "black",
            fontWeight: "bolder",
            backgroundColor: "#64a8a7",
          }}
          onClick={props?.onClick}
        >
          {props?.showExpanded ? `Reset` : `View`}
        </Button>
        {/* <button
          style={{ backgroundColor: "#64a8a7", border: "none" }}
          onClick={() => {
            console.log("hello");
          }}
        >
          View More
        </button> */}
      </div>
    </div>
  );
};

export default SmallCard;

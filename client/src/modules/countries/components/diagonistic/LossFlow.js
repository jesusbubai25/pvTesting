import React, { useState } from "react";
import PieChartComp from "../../../../components/PieChartComp";
import { Grid } from "@mui/material";

const LossFlow = () => {
  const [data, setData] = useState([
    { name: "Inverter Level DC Site Loss", value: 6.5 },
    { name: "Soiling Loss", value: 3.5 },
    { name: "Cable Loss", value: 1.0 },
  ]);
  return (
    <Grid container spacing={2}>
      <Grid
        item
        lg={11}
        style={{
          borderStyle: "solid",
          borderColor: "#ed7d31",
          borderRadius: "5px",
          marginTop: "20px",
          marginLeft: "60px",
        }}
      >
        <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>
          Loss Flow Diagram
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChartComp
            data={data}
            height={500}
            width={900}
            title="Loss Flow Diagram"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default LossFlow;

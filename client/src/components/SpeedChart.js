import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const SpeedChart = (props) => {
  return (
    <div>
      <ReactSpeedometer
        maxValue={props?.maxValue}
        minValue={props?.minValue}
        value={props?.value}
        startColor="#ed7d31"
        needleColor="#122b4f"
        endColor="#067f7ff7"
        height={250}
        width={400}
        needleTransition="easeSinIn"
        ringWidth={70}
        // fluidWidth={true} // For Responsive. It will take parent div height,width
      />
      <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
        {props?.title}
      </h3>
    </div>
  );
};

export default SpeedChart;

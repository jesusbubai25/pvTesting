import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { colors1, colors3 } from "../colors/color";

const SpeedChart = (props) => {
  return (
    <div>
      <ReactSpeedometer
        maxValue={props?.maxValue}
        minValue={props?.minValue}
        value={props?.value}
        // startColor="red"
        // endColor="blue"
        // startColor="#ed7d31"
        // needleColor="#122b4f"
        // endColor="#067f7ff7"
        segmentColors={[colors3[0],colors3[1],colors3[2],colors3[3],colors3[4],colors3[5]]}
        startColor={`${colors1[3]}`}
        needleColor={`${colors1[1]}`}
        endColor={`${colors1[2]}`}
        height={250}
        width={400}
        needleTransition="easeSinIn"
        ringWidth={70}
      // fluidWidth={true} // For Responsive. It will take parent div height,width
      />
      <h3 style={{ textAlign: "center" }}>
        {props?.title}
      </h3>
    </div>
  );
};

export default SpeedChart;

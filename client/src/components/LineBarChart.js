import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { colors1, colors3 } from "../colors/color";
export default function LineBarChart(props) {
  if (!props?.data) return null;
  return (
    <div
      style={{
        height: "max-content",
        width: "max-content",
      }}
    >

      <h3 style={{ textAlign: "center" }}>
        {props?.title}
      </h3>
      <ComposedChart
        width={props?.width}
        height={props?.height}
        data={props?.data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}

      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="name"
          fontSize={12} fontWeight={600}
        // label={{ value: "Pages", position: "insideBottomRight", offset: 0 }}
        // scale="band"
        />

        <YAxis yAxisId="left-axis" label={{ value: `${props?.y_axis_label_value1 || ""}`, angle: -90, position: "insideBottomLeft" }} />
        <YAxis
          yAxisId="right-axis"
          orientation="right"
          label={{
            value: `${props?.y_axis_label_value2 || ""}`,
            angle: -90,
            position: "insideTopRight",
            color: "yellow"
          }}
        />

        <Tooltip />
        <Legend />
        {props?.value1 && (
          <Bar
            dataKey={props?.dataKey1}
            barSize={20}
            // fill="#122b4f"
            fill={`${colors3[0]}`}
            yAxisId="left-axis"
          />
        )}
        {props?.value2 && (
          <Bar
            dataKey={props?.dataKey2}
            barSize={20}
            // fill="#ed7d31"
            fill={`${colors3[1]}`}
            yAxisId="left-axis"
          />
        )}
        {props?.value3 && (
          <Line
            type="monotone"
            dataKey={props?.dataKey3}
            strokeWidth={3}
            // stroke="#047e7ef7"
            stroke={`${colors1[4]}`}
            yAxisId="right-axis"
          />
        )}
      </ComposedChart>
    </div>
  );
}

//colors1- Index - [3,2,4]
//colors2- Index - [1,2,3]

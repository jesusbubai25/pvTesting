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

export default function LineBarChart(props) {
  if (!props?.data) return null;
  return (
    <div
      style={{
        height: "max-content",
        width: "max-content",
      }}
    >
      <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
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
          label={{ value: "Pages", position: "insideBottomRight", offset: 0 }}
          scale="band"
        />
        <YAxis yAxisId="left-axis"  label={{ value: "Energy",angle:-90,position: "insideBottomLeft" }} />
        <YAxis
          yAxisId="right-axis"
          orientation="right"
          label={{
            value: "Excess/ Shortfall",
            angle: -90,
            position: "insideTopRight",
            color: "yellow"
          }}
        />

        <Tooltip />
        <Legend />
        {!props?.hideNetEnergy && (
          <Bar
            dataKey="netEnergy"
            barSize={20}
            fill="#122b4f"
            yAxisId="left-axis"
          />
        )}
        {!props?.hideNormalisedEnergy && (
          <Bar
            dataKey="normalisedEnergy"
            barSize={20}
            fill="#ed7d31"
            yAxisId="left-axis"
          />
        )}
        {!props?.hideShortFall && (
          <Line
            type="monotone"
            dataKey="shortfall"
            stroke="#047e7ef7"
            yAxisId="right-axis"
          />
        )}
      </ComposedChart>
    </div>
  );
}

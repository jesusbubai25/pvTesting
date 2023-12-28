import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Charts from "../../../../components/Charts";
import LineChartComp from "../../../../components/LineChartComp";
import { useDispatch, useSelector } from 'react-redux'
import { GHI_GTI_data_action } from "../../../../actions/inverterActions";
import SpinLoader from "../../../../components/SpinLoader";
import Printer from "../../../../components/Printer";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Aug-21",
    PVSYST: 139,
    ACTUAL: 117.78,
  },
  {
    name: "Sep-21",
    PVSYST: 129,
    ACTUAL: 140,
  },
  {
    name: "Oct-21",
    PVSYST: 119,
    ACTUAL: 111,
  },
  {
    name: "Nov-21",
    PVSYST: 193,
    ACTUAL: 117.78,
  },
  {
    name: "Dec-21",
    PVSYST: 180.87,
    ACTUAL: 156,
  },
  {
    name: "Jan-22",
    PVSYST: 175,
    ACTUAL: 125.68,
  },
  {
    name: "Feb-22",
    PVSYST: 180,
    ACTUAL: 150,
  },
  {
    name: "Mar-22",
    PVSYST: 170,
    ACTUAL: 130,
  },
  {
    name: "April-22",
    PVSYST: 110,
    ACTUAL: 90,
  },
  {
    name: "May-22",
    PVSYST: 120,
    ACTUAL: 117.78,
  },
  {
    name: "June-22",
    PVSYST: 150,
    ACTUAL: 168,
  },
  {
    name: "July-22",
    PVSYST: 139,
    ACTUAL: 110,
  },
];

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Detailed = () => {
  const dispatch = useDispatch();
  const { GHI_GTI_data, loading, error } = useSelector(state => state.GHI_GTI_data)
  const [Ghi_Gti_data, setGHI_GTI_data] = useState({
    pvsyst_GHI: true,
    pvsyst_GTI: true,
    actual_GHI: true,
    actual_GTI: true
  })

  const onchangeHandler1 = () => {

  }
  useEffect(() => {
    dispatch(GHI_GTI_data_action())
  }, [dispatch])
  return (
    <>
      {
        loading ? <SpinLoader /> :
          GHI_GTI_data &&
          <Grid container spacing={2} paddingBottom={3} paddingTop={6} >

            {/* <Grid container lg={12} display={"flex"} alignItems={"center"} justifyContent={"center"} border={2} borderColor={"red"}> */}

            <Grid
              item
              lg={6}
              display={"flex"}
              justifyContent={"center"}
            >
              <Charts
                data={GHI_GTI_data.data1}
                width={700}
                height={300}
                title="PVSYST GHI (kwH) Vs Actual GHI (kwH)"
                xdataKey="name"
                Ghi_Gti_data={Ghi_Gti_data}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "0.2rem"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#edeaea",
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      paddingLeft: "1rem"
                    }}
                  >
                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                pvsyst_GHI: !Ghi_Gti_data.pvsyst_GHI
                              })
                            }}
                          />
                        }
                        label="Pvyst_GHI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                actual_GHI: !Ghi_Gti_data.actual_GHI
                              })
                            }}
                          />
                        }
                        label="Actual_GHI"
                      />
                    </FormGroup>
                  </div>
                </div>
              </Charts>

            </Grid>
            <Grid
              item
              lg={6}
              display={"flex"}
              justifyContent={"center"}
            >

              <Charts
                data={GHI_GTI_data.data2}
                width={700}
                height={300}
                title="PVSYST GTI (kwH) Vs Actual GTI (kwH)"
                xdataKey="name"
                Ghi_Gti_data={Ghi_Gti_data}
              >

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "0.2rem"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#edeaea",
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      paddingLeft: "1rem"
                    }}
                  >
                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                pvsyst_GTI: !Ghi_Gti_data.pvsyst_GTI
                              })
                            }}
                          />
                        }
                        label="Pvyst_GTI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                actual_GTI: !Ghi_Gti_data.actual_GTI
                              })
                            }}
                          />
                        }
                        label="Actual_GTI"
                      />
                    </FormGroup>
                  </div>
                </div>

              </Charts>
            </Grid>

            {/* </Grid> */}

            <Grid
              item
              lg={6}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LineChartComp
                data={GHI_GTI_data?.data3}
                width={700}
                height={300}
                title="PVSYST GHI (kwH) Vs Actual GHI(kwH)"
                xdataKey="name"
                value="pvsyst_GHI_vs_Actual_GHI"
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#edeaea",
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      paddingLeft: "1rem"
                    }}
                  >
                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              onchangeHandler1("Pvyst_GHI");
                            }}
                          />
                        }
                        label="Pvyst_GHI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              onchangeHandler1("Actual_GHI");
                            }}
                          />
                        }
                        label="Actual_GHI"
                      />
                    </FormGroup>
                  </div>
                </div>

              </LineChartComp>
            </Grid>

            <Grid
              item
              lg={6}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LineChartComp
                data={GHI_GTI_data?.data3}
                width={700}
                height={300}
                title="PVSYST GTI (kwH) Vs Actual GTI(kwH)"
                xdataKey="name"
                value="pvsyst_GTI_vs_Actual_GTI"
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#edeaea",
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      paddingLeft: "1rem"
                    }}
                  >
                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              onchangeHandler1("Pvyst_GHI");
                            }}
                          />
                        }
                        label="Pvyst_GTI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              onchangeHandler1("Actual_GHI");
                            }}
                          />
                        }
                        label="Actual_GTI"
                      />
                    </FormGroup>
                  </div>
                </div>

              </LineChartComp>
            </Grid>
          </Grid>
      }
    </>
  );
};

export default Detailed;


                {/* <ComposedChart
                  width={1000}
                  height={300}
                  data={GHI_GTI_data.data}
                // style={{border:"2px solid red"}}
                // margin={{
                //   top: 20,
                //   right: 20,
                //   bottom: 20,
                //   left: 20,
                // }}
                >
                  <CartesianGrid stroke="#f5f5f5" />

                  <XAxis
                    dataKey="name"
                    interval={0} fontSize={12} fontWeight={600}
                  // scale="band"
                  />
                  <YAxis yAxisId="left-axis"
                    label={{
                      value: "pvsyst_GHI & Acutal_GHI", angle: -90, position: "insideBottomLeft", fontSize: "1rem",
                      fontWeight: "600"
                    }}
                  /> */}
                  {/* <YAxis
                    yAxisId="right-axis"
                    orientation="right"
                    label={{
                      value: "pvsyst_GHI_vs_Actual_GHI",
                      angle: -90,
                      position: "insideRight",
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}
                  /> */}
                  {/* <YAxis yAxisId="right-axis"
                    orientation="right"
                    label={{
                      value: "pvsyst_GHI & Acutal_GHI", angle: -90, position: "insideRight", fontSize: "1rem",
                      fontWeight: "600"
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pvsyst_GHI"
                    barSize={20}
                    fill="#122b4f"
                    yAxisId="left-axis"
                  />
                  <Bar
                    dataKey="Actual_GHI"
                    barSize={20}
                    fill="#ed7d31"
                    yAxisId="left-axis"
                  />
                  <Line
                    type="monotone"
                    dataKey="pvsyst_GHI_vs_Actual_GHI"
                    stroke="#047e7ef7"
                    yAxisId="right-axis"
                    strokeWidth={3}
                  />
                </ComposedChart> */}


                               {/* <ComposedChart
                  width={1000}
                  height={300}
                  data={GHI_GTI_data.data}
                // style={{border:"2px solid red"}}
                // margin={{
                //   top: 20,
                //   right: 20,
                //   bottom: 20,
                //   left: 20,
                // }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis
                    dataKey="name"
                    interval={0} fontSize={12} fontWeight={600}
                  // scale="band"
                  />
                  <YAxis yAxisId="left-axis"
                    orientation="left"
                    label={{
                      value: "pvsyst_GTI & Acutal_GTI", angle: -90, position: "insideBottomLeft", fontSize: "1rem",
                      fontWeight: "600"
                    }}
                  />
                  <YAxis yAxisId="right-axis"
                    orientation="right"
                    label={{
                      value: "pvsyst_GTI & Acutal_GTI", angle: -90, position: "insideRight", fontSize: "1rem",
                      fontWeight: "600"
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  {Ghi_Gti_data.pvsyst_GTI && <Bar
                    dataKey="pvsyst_GTI"
                    barSize={20}
                    fill="#122b4f"
                    yAxisId="left-axis"
                  />}
                  {Ghi_Gti_data.actual_GTI &&<Bar
                    dataKey="Actual_GTI"
                    barSize={20}
                    fill="#ed7d31"
                    yAxisId="left-axis"
                  />}
                  {Ghi_Gti_data.pvsyst_GTI_vs_Actual_GTI &&<Line
                    type="monotone"
                    dataKey="pvsyst_GTI_vs_Actual_GTI"
                    stroke="#047e7ef7"
                    yAxisId="right-axis"
                    strokeWidth={3}
                  />}
                </ComposedChart> */}

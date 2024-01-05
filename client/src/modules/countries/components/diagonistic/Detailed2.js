import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Charts from "../../../../components/Charts";
import LineChartComp from "../../../../components/LineChartComp";
import { useDispatch, useSelector } from 'react-redux'
import { GHI_GTI_data_action, normalizedEnergyDetails } from "../../../../actions/inverterActions";
import SpinLoader from "../../../../components/SpinLoader";
import Printer from "../../../../components/Printer";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import LineBarChart from "../../../../components/LineBarChart";

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

const Detailed2 = () => {
  const dispatch = useDispatch();
  const { GHI_GTI_data, loading, error } = useSelector(state => state.GHI_GTI_data)
  const { energy } = useSelector(state => state.energy)

  const [Ghi_Gti_data, setGHI_GTI_data] = useState({
    pvsyst_GHI: true,
    pvsyst_GTI: true,
    actual_GHI: true,
    actual_GTI: true,
    pvsyst_GTI_vs_Actual_GTI: true,
    pvsyst_GHI_vs_Actual_GHI: true,
    NetEnergy: true,
    NormalisedEnergy: true,
    ShortFall: true

  })
  const [showNormalisedData, setShowNormalizedData] = useState({
    NetEnergy: true,
    contractual_energy: true,
    ShortFall: true
  })

  const [Actual_pr, setActual_pr] = useState(true)
  const [checkBox, setcheckBox] = useState({
    pvsyst_Energy: true,
    contractual_energy: true
  })

  useEffect(() => {
    dispatch(GHI_GTI_data_action())
    if (!energy) {
      dispatch(normalizedEnergyDetails())
    }
  }, [dispatch])
  return (
    <>
      {
        loading ? <SpinLoader /> :
          GHI_GTI_data?.data &&
          <Grid container spacing={2} paddingBottom={3}   >
            <Grid container display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={6}>
              <Grid
                item
                lg={10}
                border={3}
                paddingTop={4}
                paddingBottom={4}
                borderColor={"#ed7d31"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              // border={3}
              // borderColor={"#ed7d31"}
              >
                <div style={{ width: "100%", textAlign: "end", position: "relative", bottom: "15px", right: "10px" }}>
                  <Printer />
                </div>
                <LineBarChart
                  data={GHI_GTI_data?.data}
                  height={300}
                  width={1000}
                  value1={Ghi_Gti_data?.pvsyst_GTI}
                  value2={Ghi_Gti_data.actual_GTI}
                  value3={Ghi_Gti_data.pvsyst_GTI_vs_Actual_GTI}
                  dataKey1="pvsyst_GTI"
                  dataKey2="Actual_GTI"
                  dataKey3="pvsyst_GTI_vs_Actual_GTI"
                  y_axis_label_value1="Pvsyst GTI & Acutal GTI"
                  y_axis_label_value2="Pvsyst GTI vs Acutal GTI"
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem",
                    paddingTop: "0.5rem"
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
                        label="Pvyst GTI"
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
                        label="Actual GTI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                pvsyst_GTI_vs_Actual_GTI: !Ghi_Gti_data.pvsyst_GTI_vs_Actual_GTI
                              })
                            }}
                          />
                        }
                        label="Pvsyst GTI vs Actual_GTI"
                      />
                    </FormGroup>
                  </div>
                </div>

              </Grid>

            </Grid>
            <Grid container display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={6}>
              <Grid
                item
                lg={10}
                paddingBottom={4}
                paddingTop={4}
                border={3}
                borderColor={"#ed7d31"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              // border={3}
              // borderColor={"#ed7d31"}
              >
                <div style={{ width: "100%", textAlign: "end", position: "relative", bottom: "15px", right: "10px" }}>
                  <Printer />
                </div>
                <LineBarChart
                  data={GHI_GTI_data?.data}
                  height={300}
                  width={1000}
                  value1={Ghi_Gti_data?.pvsyst_GHI}
                  value2={Ghi_Gti_data.actual_GHI}
                  value3={Ghi_Gti_data.pvsyst_GHI_vs_Actual_GHI}
                  dataKey1="pvsyst_GHI"
                  dataKey2="Actual_GHI"
                  dataKey3="pvsyst_GHI_vs_Actual_GHI"
                  y_axis_label_value1="Pvsyst_GHI & Acutal_GHI"
                  y_axis_label_value2="Pvsyst GHI vs Acutal_GHI"
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem",
                    paddingTop: "0.5rem"
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
                        label="Pvyst GHI"
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
                        label="Actual GHI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                pvsyst_GHI_vs_Actual_GHI: !Ghi_Gti_data.pvsyst_GHI_vs_Actual_GHI
                              })
                            }}
                          />
                        }
                        label="Pvsyst GHI vs Actual GHI"
                      />
                    </FormGroup>
                  </div>
                </div>

              </Grid>

            </Grid>


            <Grid container display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={6}>
              <Grid
                item
                lg={10}
                paddingBottom={4}
                paddingTop={4}
                border={3}
                borderColor={"#ed7d31"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              // border={3}
              // borderColor={"#ed7d31"}
              >
                <div style={{ width: "100%", textAlign: "end", position: "relative", bottom: "15px", right: "10px" }}>
                  <Printer />
                </div>
                <LineBarChart
                  data={energy?.data2}
                  height={300}
                  width={1000}
                  value1={Ghi_Gti_data?.NetEnergy}
                  value2={Ghi_Gti_data?.NormalisedEnergy}
                  value3={Ghi_Gti_data?.ShortFall}
                  dataKey1="netEnergy"
                  dataKey2="normalisedEnergy"
                  dataKey3="shortfall"
                  y_axis_label_value1="Energy"
                  y_axis_label_value2="Excess/Shortfall In %"
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem",
                    paddingTop: "0.5rem"
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
                                NetEnergy: !Ghi_Gti_data.NetEnergy
                              })
                            }}
                          />
                        }
                        label="Net Energy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                NormalisedEnergy: !Ghi_Gti_data.NormalisedEnergy
                              })
                            }}
                          />
                        }
                        label="Normalised Energy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              setGHI_GTI_data({
                                ...Ghi_Gti_data,
                                ShortFall: !Ghi_Gti_data.ShortFall
                              })
                            }}
                          />
                        }
                        label="ShortFall"
                      />
                    </FormGroup>
                  </div>
                </div>

              </Grid>

            </Grid>


            <Grid container display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={6}>
              <Grid
                item
                lg={10}
                paddingBottom={4}
                paddingTop={4}
                border={3}
                borderColor={"#ed7d31"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              // border={3}
              // borderColor={"#ed7d31"}
              >
                <div style={{ width: "100%", textAlign: "end", position: "relative", bottom: "15px", right: "10px" }}>
                  <Printer  />
                </div>
                <LineBarChart
                  data={energy?.data3}
                  height={300}
                  width={1000}
                  value1={showNormalisedData?.NetEnergy}
                  value2={showNormalisedData?.contractual_energy}
                  value3={showNormalisedData?.ShortFall}
                  dataKey1="netEnergy"
                  dataKey2="contructual_energy"
                  dataKey3="ExcessORShortfallNormalised_Percentage"
                  y_axis_label_value1="Energy"
                  y_axis_label_value2="Excess/Shortfall In %"
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem",
                    paddingTop: "0.5rem"
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
                              setShowNormalizedData({
                                ...showNormalisedData,
                                NetEnergy: !showNormalisedData.NetEnergy
                              })
                            }}
                          />
                        }
                        label="Net Energy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              setShowNormalizedData({
                                ...showNormalisedData,
                                contractual_energy: !showNormalisedData.contractual_energy
                              })
                            }}
                          />
                        }
                        label="Normalised Energy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"
                            onChange={(e) => {
                              setShowNormalizedData({
                                ...showNormalisedData,
                                ShortFall: !showNormalisedData.ShortFall
                              })
                            }}
                          />
                        }
                        label="ShortFall"
                      />
                    </FormGroup>
                  </div>
                </div>

              </Grid>

            </Grid>


            <Grid container
              border={3}
              borderColor={"#ed7d31"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"} lg={12}
              margin={"auto"}
              marginTop={5}
              marginLeft={4}
            >
              <Grid
                item
                lg={6}
              >
                {/* <div style={{ width: "100%", textAlign: "end", position: "relative", bottom: "15px", right: "10px" }}>
                  <Printer />
                </div> */}
                <LineBarChart
                  data={energy?.data3}
                  height={300}
                  width={850}
                  value1={checkBox?.pvsyst_Energy}
                  value2={checkBox?.contractual_energy}
                  dataKey1="pvsyst_Energy"
                  dataKey2="contructual_energy"
                // dataKey3="Actual_pr"
                // y_axis_label_value1="Energy"
                // y_axis_label_value2="Excess/Shortfall"
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem",
                    paddingTop: "0.5rem"
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
                              setcheckBox({
                                ...checkBox,
                                pvsyst_Energy: !checkBox.pvsyst_Energy
                              })
                            }}
                          />
                        }
                        label="Pvsyst Energy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="success"

                            onChange={(e) => {
                              setcheckBox({
                                ...checkBox,
                                contractual_energy: !checkBox.contractual_energy
                              })
                            }}
                          />
                        }
                        label="Contractual Energy"
                      />

                    </FormGroup>
                  </div>
                </div>


              </Grid>
              <Grid lg={6} marginTop={4.5} paddingLeft={3}>
                <div style={{ width: "100%", textAlign: "end", position: "relative", bottom: "15px", right: "10px" }}>
                  <Printer />
                </div>
                <LineChart
                  width={680}
                  height={280}
                  margin={{
                    bottom: 20
                  }}
                  data={energy?.data3}

                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis interval={0} dataKey="name" fontSize={"0.8rem"} fontWeight={600} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Actual_pr && <Line
                    type="monotone"
                    dataKey="Actual_pr"
                    stroke="#8884d8"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                  }
                </LineChart>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "0.7rem",
                    paddingTop: "0.5rem"
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
                              setActual_pr(!Actual_pr)
                            }}
                          />
                        }
                        label="Actual Pr"
                      />
                    </FormGroup>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
      }
    </>
  );
};

export default Detailed2;



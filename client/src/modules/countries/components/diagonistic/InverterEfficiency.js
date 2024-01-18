import React, { useEffect, useMemo, useState } from "react";
import Charts from "../../../../components/Charts";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { All_Inverter_Efficiency_Monthly, Inverter_Efficiency } from "../../../../actions/inverterActions";
import SpinLoader from "../../../../components/SpinLoader";


const InverterEfficiency = () => {
  const dispatch = useDispatch();
  const { efficiencies, loading } = useSelector(state => state.efficiency)
  const { monthly_inverter_efficiency } = useSelector(state => state.monthly_inverter_efficiency)
  const [InverterData, setInverterData] = useState(null)
  const [InverterMonthlyData, setInverterMonthlyData] = useState(null)
  const [s_checkBoxChecked, s_setCheckBoxChecked] = useState({
    inverter1: true,
    inverter2: true,
    inverter3: true,
    inverter4: true,
  });
  const [m_checkBoxChecked, m_setCheckBoxChecked] = useState({
    m_Inverter1: true,
    m_Inverter2: true,
    m_Inverter3: true,
    m_Inverter4: true,
  });
  const onchangeHandler1 = (fname) => {
    console.log(s_checkBoxChecked, " value")
    try {
      const newData1 = efficiencies?.filter((item) => {
        if (item?.name != fname) {
          if (s_checkBoxChecked[item?.name]) return item;
        } else {
          if (!s_checkBoxChecked[item?.name]) return item;
        }
      });
      const checked = { ...s_checkBoxChecked }
      checked[fname] = !checked[fname];
      s_setCheckBoxChecked(checked);
      setInverterData(newData1)
    } catch (error) {
    }

  }

  useMemo(() => {
    setInverterData(efficiencies)
    setInverterMonthlyData(monthly_inverter_efficiency)
  }, [efficiencies, monthly_inverter_efficiency])



  useEffect(() => {
    dispatch(Inverter_Efficiency())
    dispatch(All_Inverter_Efficiency_Monthly())
  }, [dispatch])
  return (
    <>
      {
        loading ? <SpinLoader /> :
          <>
            {InverterData && InverterMonthlyData &&
              <Grid container spacing={2} padding={"0.5rem"} >

                <Grid item lg={6} display={"flex"} flexDirection={"column"} >
                  <Charts
                    data={InverterData}
                    width={740}
                    height={500}
                    title="Yearly Average Inverter Efficiency"
                    xdataKey="name"
                    size={
                      {
                        minValue: 98.00,
                        maxValue: 99.00
                      }
                    }
                    position={0}
                    s_checkBoxChecked={s_checkBoxChecked}
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
                                  onchangeHandler1("inverter1");
                                }}
                              />
                            }
                            label="Inverter 1"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                color="success"

                                onChange={(e) => {
                                  onchangeHandler1("inverter2");
                                }}
                              />
                            }
                            label="Inverter 2"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                color="success"

                                onChange={(e) => {
                                  onchangeHandler1("inverter3");
                                }}
                              />
                            }
                            label="Inverter 3"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                color="success"
                                onChange={(e) => {
                                  onchangeHandler1("inverter4");
                                }}
                              />
                            }
                            label="Inverter 4"
                          />
                        </FormGroup>
                      </div>
                    </div>

                  </Charts>
                </Grid>
                <Grid item lg={6} style={{ display: "flex", justifyContent: "center" }}>
                  <Charts
                    data={InverterMonthlyData}
                    width={740}
                    height={500}
                    title="Monthly Average Inverter Efficiency"
                    xdataKey="name"
                    size={
                      {
                        minValue: 96.00,
                        maxValue: 98.00
                      }
                    }
                    position={1}

                    m_checkBoxChecked={m_checkBoxChecked}
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
                                  m_setCheckBoxChecked({
                                    ...m_checkBoxChecked,
                                    m_Inverter1: !m_checkBoxChecked.m_Inverter1
                                  });
                                }}
                              />
                            }
                            label="Inverter 1"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                color="success"
                                onChange={(e) => {
                                  m_setCheckBoxChecked({
                                    ...m_checkBoxChecked,
                                    m_Inverter2: !m_checkBoxChecked.m_Inverter2
                                  });
                                }}
                              />
                            }
                            label="Inverter 2"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                color="success"
                                onChange={(e) => {
                                  m_setCheckBoxChecked({
                                    ...m_checkBoxChecked,
                                    m_Inverter3: !m_checkBoxChecked.m_Inverter3
                                  });
                                }}
                              />
                            }
                            label="Inverter 3"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                color="success"
                                onChange={(e) => {
                                  m_setCheckBoxChecked({
                                    ...m_checkBoxChecked,
                                    m_Inverter4: !m_checkBoxChecked.m_Inverter4
                                  });
                                }}
                              />
                            }
                            label="Inverter 4"
                          />
                        </FormGroup>
                      </div>
                    </div>

                  </Charts>
                </Grid>
              </Grid>
            }
          </>

      }
    </>
  );
};

export default InverterEfficiency;

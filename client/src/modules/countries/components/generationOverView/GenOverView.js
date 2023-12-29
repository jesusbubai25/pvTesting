import React, { useEffect, useMemo, useRef, useState } from "react";
import LineBarChart from "../../../../components/LineBarChart";
import CountryHeader from "../CountryHeader";
import "../CountryDefault.css";
import "./GenOverView.css";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import SpeedChart from "../../../../components/SpeedChart";
import { useDispatch, useSelector } from "react-redux";
import { normalizedEnergyDetails } from "../../../../actions/inverterActions";
import SpinLoader from "../../../../components/SpinLoader";
import SelectOptions from "./SelectOptions";
import Printer from "../../../../components/Printer";
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas';
import ProjectDetailsHeader from "../ProjectDetails/ProjectDetailsHeader";





const GenOverView = () => {
  const { loading, energy } = useSelector(state => state.energy)
  const [yearlyEnergyMonth, setYearlyEnergyMonth] = useState("Yearly");
  const [yearlyEnergyMonth2, setYearlyEnergyMonth2] = useState("Yearly");
  const [yearlyEnergyMonth3, setYearlyEnergyMonth3] = useState("Yearly");
  const [netenergy, setnetEnergy] = useState(0);
  const [Contractual_energy, setContractual_energy] = useState(0);
  const [ExcessORShortfall_kwh, setExcessORShortfall_kwh] = useState(0);
  const [ExcessORShortfall_Percentage, setExcessORShortfall_Percentage] = useState(0)
  const [AC_Loss, setAC_Loss] = useState(0)
  const [Acutal_pr, setAcutal_pr] = useState(0)
  const [checkBoxChecked, setCheckBoxChecked] = useState({
    NetEnergy: true,
    NormalisedEnergy: true,
    ShortFall: true,
  });
  const downloadRef1 = useRef(null)
  const downloadRef2 = useRef(null)
  const downloadRef3 = useRef(null)
  const speedometerRef1 = useRef(null);
  const speedometerRef2 = useRef(null);
  const speedometerRef3 = useRef(null);
  const [storeElement, setStoreElement] = useState(null)
  useMemo(() => {
    if (energy?.data1) {
      let initalmonth = energy.data1.find(e => e.month === "Yearly")
      setContractual_energy(initalmonth.contructual_energy)
      setnetEnergy(initalmonth.net_energy)
      setExcessORShortfall_kwh(initalmonth.ExcessORShortfall_kwh)
      setExcessORShortfall_Percentage(initalmonth.ExcessORShortfall_Percentage)
      setAC_Loss(initalmonth.AC_Loss)
      setAcutal_pr(initalmonth.Acutal_pr)
    }

  }, [energy])

  const dispatch = useDispatch();

  const handleChangeYear1 = ({ month, net_energy, contructual_energy }) => {
    try {
      setnetEnergy(net_energy);
      setContractual_energy(contructual_energy)
      setYearlyEnergyMonth(month);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeYear2 = ({ month, ExcessORShortfall_kwh, ExcessORShortfall_Percentage }) => {
    try {
      setExcessORShortfall_Percentage(ExcessORShortfall_Percentage)
      setExcessORShortfall_kwh(ExcessORShortfall_kwh)
      setYearlyEnergyMonth2(month);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeYear3 = ({ month, AC_Loss, Acutal_pr }) => {
    try {
      setAC_Loss(AC_Loss)
      setAcutal_pr(Acutal_pr)

      setYearlyEnergyMonth3(month);
    } catch (error) {
      console.log(error);
    }
  };

  const clickhandler1 = () => {
    downloadRef1.current.link.click();
  }
  const clickhandler2 = () => {
    downloadRef2.current.link.click();
  }
  const clickhandler3 = () => {
    downloadRef3.current.link.click();
  }
  const jpgDownload1 = async () => {
    const canvas = await html2canvas(speedometerRef1.current, { foreignObjectRendering: true });
    canvas.height = 500
    canvas.width = 1000
    console.log(canvas)
    const data = canvas.toDataURL('image/jpg', 1.0);
    saveAs(data, 'graph.jpg')
  };
  const jpgDownload2 = async () => {
    const canvas = await html2canvas(speedometerRef2.current, { foreignObjectRendering: true });
    const data = canvas.toDataURL('image/jpg', 1.0);
    saveAs(data, 'graph.jpg')
  };
  const jpgDownload3 = async () => {
    const canvas = await html2canvas(speedometerRef3.current, { foreignObjectRendering: true });
    const data = canvas.toDataURL('image/jpg', 1.0);
    saveAs(data, 'graph.jpg')
  };

  const vdata = energy?.data1.reduce((acc, curr) => {
    return (
      acc = [...acc, {
        month: curr.month,
        net_energy: curr.net_energy,
        contructual_energy: curr.contructual_energy
      }]

    )

  }, [])
  const CsvData = (data, val1, val2) => {
    return data.reduce((acc, curr) => {
      if (val1 === 1 && val2 === 2) {
        return (
          [...acc, {
            month: curr.month, net_energy: curr.net_energy,
            contructual_energy: curr.contructual_energy
          }]
        )
      } else if (val1 === 3 && val2 === 4) {
        return (
          [...acc, {
            month: curr.month, ExcessORShortfall_kwh: curr.ExcessORShortfall_kwh,
            ExcessORShortfall_Percentage: curr.ExcessORShortfall_Percentage
          }]
        )
      }
      else {
        return (
          [...acc, {
            month: curr.month, AC_Loss: curr.AC_Loss, Acutal_pr: curr.Acutal_pr
          }]

        )
      }

    }, [])

  }

  useEffect(() => {
    dispatch(normalizedEnergyDetails())

  }, [dispatch])

  console.log(speedometerRef1)
  return (
    <div>
      <div className="country-header">
        <ProjectDetailsHeader />
        {/* <CountryHeader /> */}
      </div>
      {loading ? <SpinLoader /> :
        <>
          {energy?.data1 && energy?.data2 &&
            <div >
              <Grid container spacing={2} paddingTop={2} paddingBottom={3}>

                <Grid
                  item
                  lg={12}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#ed7d31",
                    borderWidth: "3px",
                    borderRadius: "5px",

                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  // ref={(chart) => setStoreElement(chart)}
                  ref={speedometerRef1}


                >
                  <Printer clickhandler={clickhandler1} jpgDownload={jpgDownload1} />
                  <CSVLink
                    data={CsvData(energy?.data1, 1, 2)}
                    filename='data.csv'
                    className='hidden'
                    ref={downloadRef1}
                    target='_blank'
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginBottom: "10px",
                    }}
                  >
                    <select
                      name="level"
                      id="level"
                      style={{
                        width: "15vw",
                        height: "7vh",
                        textAlign: "center",
                        fontWeight: "bolder",
                        borderStyle: "solid",
                        borderColor: "#ED7D31",
                        borderWidth: "3px",
                        fontSize: "20px",
                        backgroundColor: "#edeaea",
                      }}
                      onChange={(e) => {
                        if (e.target.value === "None") {
                          setContractual_energy(0)
                          setnetEnergy(0);
                          setYearlyEnergyMonth("")
                          return;
                        }
                        const data = energy.data1?.find((m) => m.month === e.target.value);
                        handleChangeYear1(data);
                      }}
                    >
                      <SelectOptions />
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                    <SpeedChart

                      title={`${yearlyEnergyMonth === "None" ? "" : yearlyEnergyMonth} Net Energy & Grid Loss`.trim()}
                      minValue={0}
                      maxValue={20000000}
                      value={netenergy}
                    />
                    <SpeedChart
                      title={`${yearlyEnergyMonth === "None" ? "" : yearlyEnergyMonth} Contractual Energy`.trim()}
                      minValue={0}
                      maxValue={20000000}
                      value={Contractual_energy}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={12}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#ed7d31",
                    borderWidth: "3px",
                    borderRadius: "5px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  ref={speedometerRef2}

                >
                  <Printer clickhandler={clickhandler2} jpgDownload={jpgDownload2} />
                  <CSVLink
                    data={CsvData(energy?.data1, 3, 4)}
                    filename='data.csv'
                    className='hidden'
                    ref={downloadRef2}
                    target='_blank'
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginBottom: "10px",
                    }}
                  >
                    <select
                      name="level"
                      id="level"
                      style={{
                        width: "15vw",
                        height: "7vh",
                        textAlign: "center",
                        fontWeight: "bolder",
                        borderStyle: "solid",
                        borderColor: "#ED7D31",
                        borderWidth: "3px",
                        fontSize: "20px",
                        backgroundColor: "#edeaea",
                      }}
                      onChange={(e) => {
                        if (e.target.value === "None") {
                          setExcessORShortfall_Percentage(0);
                          setExcessORShortfall_kwh(0);
                          setYearlyEnergyMonth2("")
                          return;
                        }
                        const data = energy.data1?.find((m) => m.month === e.target.value);
                        handleChangeYear2(data);
                      }}
                    >
                      <SelectOptions />
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <SpeedChart
                      title={`${yearlyEnergyMonth2 === "None" ? "" : yearlyEnergyMonth2} Excess Shortfall`}
                      minValue={-1000000}
                      maxValue={100000}
                      value={ExcessORShortfall_kwh}
                    />
                    <SpeedChart
                      title={`${yearlyEnergyMonth2 === "None" ? "" : yearlyEnergyMonth2} Excess/Shortfall Percentage`.trim()}
                      minValue={-200}
                      maxValue={200}
                      value={ExcessORShortfall_Percentage}
                    />
                  </div>
                </Grid>

                <Grid
                  item
                  lg={12}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#ed7d31",
                    borderWidth: "3px",
                    borderRadius: "5px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  ref={speedometerRef3}
                >
                  <Printer clickhandler={clickhandler3} jpgDownload={jpgDownload3} />
                  <CSVLink
                    data={CsvData(energy?.data1, 5, 6)}
                    filename='data.csv'
                    className='hidden'
                    ref={downloadRef3}
                    target='_blank'
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginBottom: "10px",
                    }}
                  >
                    <select
                      name="level"
                      id="level"
                      style={{
                        width: "15vw",
                        height: "7vh",
                        textAlign: "center",
                        fontWeight: "bolder",
                        borderStyle: "solid",
                        borderColor: "#ED7D31",
                        borderWidth: "3px",
                        fontSize: "20px",
                        backgroundColor: "#edeaea",
                      }}
                      onChange={(e) => {
                        if (e.target.value === "None") {
                          setAC_Loss(0)
                          setAcutal_pr(0);
                          setYearlyEnergyMonth3("")
                          return;
                        }
                        const data = energy.data1?.find((m) => m.month === e.target.value);
                        handleChangeYear3(data);
                      }}
                    >
                      <SelectOptions />
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <SpeedChart
                      title={`${yearlyEnergyMonth3 === "None" ? "" : yearlyEnergyMonth3} Actual PR`}
                      minValue={-1000}
                      maxValue={1000}
                      value={Acutal_pr}
                    />
                    <SpeedChart
                      title={`${yearlyEnergyMonth3 === "None" ? "" : yearlyEnergyMonth3} AC Line Loss Percentage`}
                      minValue={-20}
                      maxValue={20}
                      value={AC_Loss}
                    />
                  </div>
                </Grid>

                <Grid
                  item
                  lg={12}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#ed7d31",
                    borderWidth: "3px",
                    borderRadius: "5px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                >

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
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
                                setCheckBoxChecked({
                                  ...checkBoxChecked,
                                  NetEnergy: !checkBoxChecked?.NetEnergy,
                                });
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
                                setCheckBoxChecked({
                                  ...checkBoxChecked,
                                  NormalisedEnergy:
                                    !checkBoxChecked?.NormalisedEnergy,
                                });
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
                                setCheckBoxChecked({
                                  ...checkBoxChecked,
                                  ShortFall: !checkBoxChecked?.ShortFall,
                                });
                              }}
                            />
                          }
                          label="Shortfall"
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <LineBarChart
                      data={energy?.data2}
                      height={200}
                      width={1000}
                      title=" Yearly Net Energy Vs Normalised Energy Vs Excess/Shortfall"
                      value1={checkBoxChecked?.NetEnergy}
                      value2={checkBoxChecked?.NormalisedEnergy}
                      value3={checkBoxChecked?.ShortFall}
                      dataKey1="netEnergy"
                      dataKey2="normalisedEnergy"
                      dataKey3="shortfall"
                      y_axis_label_value1="Energy"
                      y_axis_label_value2="Excess/Shortfall"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          }
        </>
      }
    </div>
  );
};

export default GenOverView;

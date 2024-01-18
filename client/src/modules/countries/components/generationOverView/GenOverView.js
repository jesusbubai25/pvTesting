import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import LineBarChart from "../../../../components/LineBarChart";
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
import html2canvas from 'html2canvas';
import GaugeChart from "./GaugeChartComp";
import GaugeChartComp from "./GaugeChartComp";




const GenOverView = () => {
  const { loading, energy } = useSelector(state => state.energy)
  const [netenergy, setnetEnergy] = useState(null);
  const [Contractual_energy, setContractual_energy] = useState(null);
  const [ExcessORShortfall_kwh, setExcessORShortfall_kwh] = useState(null);
  const [ExcessORShortfall_Percentage, setExcessORShortfall_Percentage] = useState(null)
  const [AC_Loss, setAC_Loss] = useState(null)
  const [Actual_pr, setActual_pr] = useState(null)
  const [yearlyDetail, setYearlyDetail] = useState({
    netenergy: 0,
    contructual_energy: 0,
    ShortFall: 0,
    revenu_loss: 0,
    actual_pr: 0
  })
  const [checkBoxChecked, setCheckBoxChecked] = useState({
    NetEnergy: true,
    NormalisedEnergy: true,
    ShortFall: true,
  });
  const downloadRef1 = useRef(null)
  const downloadRef2 = useRef(null)
  const downloadRef3 = useRef(null)
  const downloadRef4 = useRef(null)
  const speedometerRef1 = useRef(null);
  const speedometerRef2 = useRef(null);
  const speedometerRef3 = useRef(null);
  const graphRef = useRef(null);
  useMemo(() => {
    if (energy?.data1) {
      let initalmonth = energy?.data1?.find(e => e.month === "January")
      let Yearly = energy?.data1?.find(e => e.month === "Yearly")
      setContractual_energy(initalmonth.contructual_energy)
      setnetEnergy(initalmonth.net_energy)
      setExcessORShortfall_kwh(initalmonth.ExcessORShortfall_kwh)
      setExcessORShortfall_Percentage(initalmonth.ExcessORShortfall_Percentage)
      setAC_Loss(initalmonth.AC_Loss)
      setActual_pr(initalmonth.Actual_pr)
      if (!yearlyDetail.netenergy || !yearlyDetail.contructual_energy || !yearlyDetail.ShortFall || !yearlyDetail.actual_pr || !yearlyDetail.revenu_loss) {
        setYearlyDetail({
          ...yearlyDetail,
          netenergy: Yearly.net_energy,
          contructual_energy: Yearly.contructual_energy,
          ShortFall: Yearly.ExcessORShortfall_Percentage,
          actual_pr: Yearly.Actual_pr,
          revenu_loss: Yearly.ExcessORShortfall_kwh * 3.5
        })

      }
    }
    console.log(yearlyDetail)
    if (energy?.data1) {

    }

  }, [energy?.data1])

  const dispatch = useDispatch();
  const handleChangeYear1 = ({ month, net_energy, contructual_energy }) => {
    setnetEnergy(net_energy);
    setContractual_energy(contructual_energy)
  };

  const handleChangeYear2 = ({ month, ExcessORShortfall_kwh, ExcessORShortfall_Percentage }) => {
    setExcessORShortfall_Percentage(ExcessORShortfall_Percentage)
    setExcessORShortfall_kwh(ExcessORShortfall_kwh)
  };
  const handleChangeYear3 = ({ month, AC_Loss, Actual_pr }) => {
    setAC_Loss(AC_Loss)
    setActual_pr(Actual_pr)
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
  const clickhandler4 = () => {
    downloadRef4.current.link.click();
  }
  const jpgDownload1 = async () => {
    // setTimeout(async () => {
    //   const canvas = await html2canvas(speedometerRef1.current, { foreignObjectRendering: true });
    //   console.log(canvas)
    //   const data = canvas.toDataURL();
    //   saveAs(data, 'graph.jpg')
    // }, 100);

    setTimeout(async () => {
      const canvas = await html2canvas(speedometerRef1.current, {
        // scrollY: -window.scrollY,
        // crossOrigin: 'Anonymous',
        // allowTaint: true,
        // foreignObjectRendering: true
      });
      const dataURL = canvas.toDataURL('image/jpg');
      saveAs(dataURL, 'graph.jpg')
    }, 100);

  };
  const jpgDownload2 = async () => {
    setTimeout(async () => {
      const canvas = await html2canvas(speedometerRef2.current);
      const dataURL = canvas.toDataURL('image/jpg');
      saveAs(dataURL, 'graph.jpg')
    }, 100);

    // const canvas = await html2canvas(speedometerRef2.current, { foreignObjectRendering: true });
    // const data = canvas.toDataURL();
    // saveAs(data, 'graph.jpg')
  };
  const jpgDownload3 = async () => {
    setTimeout(async () => {
      const canvas = await html2canvas(speedometerRef3.current);
      const data = canvas.toDataURL();
      saveAs(data, 'graph.jpg')
    }, 100);

  };

  const jpgDownload4 = async () => {
    setTimeout(async () => {
      const canvas = await html2canvas(graphRef.current);
      const data = canvas.toDataURL();
      saveAs(data, 'graph.jpg')
    }, 100);

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
            month: curr.month, AC_Loss: curr.AC_Loss, Actual_pr: curr.Actual_pr
          }]

        )
      }

    }, [])

  }

  const convertToReadableValue=(val)=>{
    let string=""+val;
    let arr=string.split("")
    arr.splice(1,0,",")
    arr.splice(4,0,",")
    arr.splice(7,0,",")
    return arr.join("")
  }

  useEffect(() => {
    dispatch(normalizedEnergyDetails())
  }, [dispatch])
console.log("values is ")
  console.log(yearlyDetail.ShortFall/100)
  console.log(yearlyDetail.actual_pr/100)
  console.log(yearlyDetail.revenu_loss/100)
  return (

    <>
      {loading ? <SpinLoader /> :
        <>
          {energy?.data1 && energy?.data2 &&
            <div >
              <Grid container spacing={2} paddingTop={2} paddingBottom={3}>

                <Grid
                  // sx={{ boxShadow: 2 }}
                  item
                  lg={11}

                  style={{
                    borderWidth: "3px",
                    borderRadius: "8px",
                    marginLeft: "20px",
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                    margin: "auto",
                    padding: "2rem 5rem",
                    gap: "1rem"
                  }}
                  boxShadow={"1px 2px 3px solid"}
                  className="generation_overview"
                >
                  <div style={{ width: "23%", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "4px", gap: "1rem" }} >

                    <div className="left_box_1" style={{ height: "50%", display: "flex", alignItems: "flex-start", flexDirection: "column", gap: "0.2rem", padding: "0.7rem 0.5rem" }}>
                      <span>Net Energy Yearly</span>
                      <span><b>{convertToReadableValue(yearlyDetail.netenergy)} Kwh</b> </span>
                    </div>

                    <div className="left_box_2" style={{ height: "50%",  display: "flex", alignItems: "flex-start", flexDirection: "column", gap: "0.2rem", padding: "0.7rem 0.5rem" }}>
                      <span>Contractual Energy Yearly</span>
                      <span><b>{convertToReadableValue(yearlyDetail.contructual_energy)} Kwh</b></span>
                    </div>

                  </div>
                  <div className="show_value_container" >
                    {/* <div className="bubbles">
                      <div class="bubble"></div>
                      <div class="bubble"></div>
                    </div> */}

                    <span> ShortFall/Excess (%)</span>

                    <div className="show_value">
                      <GaugeChartComp
                        id="gauge_chart1"
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        value={yearlyDetail.ShortFall }
                        minValue={-50}
                        maxValue={50}
                      />

                    </div>

                  </div>
                  <div className="show_value_container" style={{ width: "17%" }}>
                    <span>Revenue Loss (&#8377;)</span>

                    <div className="show_value">
                      <GaugeChartComp
                        id="gauge_chart2"
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        value={Math.abs(yearlyDetail.revenu_loss )}
                        minValue={0}
                        maxValue={10000000}
                      />

                    </div>
                  </div>
                  <div className="show_value_container" style={{ width: "17%" }}>
                    <span>Actual PR (%)</span>

                    <div className="show_value">
                      <GaugeChartComp
                        id="gauge_chart3"
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        value={yearlyDetail.actual_pr }
                        minValue={0}
                        maxValue={100}
                      />


                    </div>
                  </div>
                  <div className="show_value_container" style={{ width: "17%" }}>
                    <span>Plant Availabilaty Yearly (%)</span>
                    <div className="show_value">
                      <GaugeChartComp
                        id="gauge_chart4"
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        value={(Math.floor(Math.random() * (100 - 99 + 1) + 99))}
                        minValue={0}
                        maxValue={100}
                      />
                    </div>
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
                        const data = energy.data1?.find((m) => m.month === e.target.value);
                        handleChangeYear1(data);
                      }}
                    >
                      <SelectOptions />
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                    <SpeedChart
                      title={`Net Energy`}
                      minValue={0}
                      maxValue={20000000}
                      value={netenergy}
                    />
                    <SpeedChart
                      title={`Contractual Energy`}
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
                        const data = energy.data1?.find((m) => m.month === e.target.value);
                        handleChangeYear2(data);
                      }}
                    >
                      <SelectOptions />
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <SpeedChart
                      title={`Excess Shortfall`}
                      minValue={-1000000}
                      maxValue={100000}
                      value={ExcessORShortfall_kwh}
                    />
                    <SpeedChart
                      title={`Excess/Shortfall Percentage`}
                      minValue={-100}
                      maxValue={100}
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
                        const data = energy.data1?.find((m) => m.month === e.target.value);
                        handleChangeYear3(data);
                      }}
                    >
                      <SelectOptions />
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <SpeedChart
                      title={`Actual PR`}
                      minValue={0}
                      maxValue={100}
                      value={Actual_pr}
                    />
                    <SpeedChart
                      title={`AC Line Loss Percentage`}
                      minValue={0}
                      maxValue={2}
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
                    position: "relative"
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

                  <div style={{ display: "flex", justifyContent: "center" }} ref={graphRef}>
                    <LineBarChart
                      data={energy?.data2}
                      height={200}
                      width={1000}
                      title="Net Energy Vs Normalised Energy Vs Excess/Shortfall"
                      value1={checkBoxChecked?.NetEnergy}
                      value2={checkBoxChecked?.NormalisedEnergy}
                      value3={checkBoxChecked?.ShortFall}
                      dataKey1="netEnergy"
                      dataKey2="normalisedEnergy"
                      dataKey3="shortfall"
                      y_axis_label_value1="Energy"
                      y_axis_label_value2="Excess/Shortfall"
                      position={0}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          }
        </>
      }
    </>
  );
};

export default GenOverView;

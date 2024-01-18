import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import LineBarChart from "../../../../components/LineBarChart";
// import "../CountryDefault.css";
import "./GenOverView2.css";
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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { graphData, graphData2, graphData3 } from "../../../../constants/Data";





const GenOverView2 = () => {
  const { loading, energy } = useSelector(state => state.energy)
  const [netenergy, setnetEnergy] = useState(null);
  const [Contractual_energy, setContractual_energy] = useState(null);
  const [ExcessORShortfall_kwh, setExcessORShortfall_kwh] = useState(null);
  const [ExcessORShortfall_Percentage, setExcessORShortfall_Percentage] = useState(null)
  const [AC_Loss, setAC_Loss] = useState(null)
  const [Actual_pr, setActual_pr] = useState(null)

  const [progressValue, setProgressValue] = useState({
    progress_1: false,
    progress_2: false,
    progress_3: false
  })
  const [yearlyDetail, setYearlyDetail] = useState({
    netenergy: 0,
    contructual_energy: 0,
    ShortFall: 0,
    revenu_loss: 0,
    actual_pr: 0,
    plant_availability: 0
  })


  const [checkBoxChecked, setCheckBoxChecked] = useState({
    NetEnergy: true,
    ContractualEnergy: true,
    ShortFall: true,
  });
  const [monthlyDetail, setMonthlyDetail] = useState([])
  const [checkedActualPr, setCheckedActualPr] = useState(true);
  const downloadRef1 = useRef(null)
  const downloadRef2 = useRef(null)
  const downloadRef3 = useRef(null)
  const downloadRef4 = useRef(null)
  const speedometerRef1 = useRef(null);
  const speedometerRef2 = useRef(null);
  const speedometerRef3 = useRef(null);
  const graphRef = useRef(null);


  const dispatch = useDispatch();





  useMemo(() => {


    if (energy?.data1) {


      let newdata = [];
      let plant_avg = 0;
      let temp = energy?.data1 || [];
      for (let i = 1; i < temp?.length; i++) {
        let obj = {};
        obj.name = temp[i].month;
        obj.actual_pr = temp[i].Actual_pr
        obj.plant_availability = (Math.floor(Math.random() * (100 - 99 + 1) + 99))
        obj.ac_loss = temp[i].AC_Loss
        obj.net_energy = temp[i].net_energy;
        obj.contructual_energy = temp[i].contructual_energy;
        obj.excess_shortfall_percentage = temp[i].ExcessORShortfall_Percentage;
        plant_avg += obj.plant_availability;
        newdata.push(obj)
      }
      setMonthlyDetail(newdata);




      let initalmonth = energy?.data1?.find(e => e.month === "January")
      let Yearly = energy?.data1?.find(e => e.month === "Yearly")
      setContractual_energy(initalmonth.contructual_energy)
      setnetEnergy(initalmonth.net_energy)
      setExcessORShortfall_kwh(initalmonth.ExcessORShortfall_kwh)
      setExcessORShortfall_Percentage(initalmonth.ExcessORShortfall_Percentage)
      setAC_Loss(initalmonth.AC_Loss)
      setActual_pr(initalmonth.Actual_pr)
      if (!yearlyDetail.netenergy || !yearlyDetail.contructual_energy || !yearlyDetail.ShortFall || !yearlyDetail.actual_pr || !yearlyDetail.revenu_loss || !yearlyDetail.plant_availability) {
        setYearlyDetail({
          ...yearlyDetail,
          netenergy: Yearly.net_energy,
          contructual_energy: Yearly.contructual_energy,
          ShortFall: Yearly.ExcessORShortfall_Percentage,
          actual_pr: Yearly.Actual_pr,
          revenu_loss: Yearly.ExcessORShortfall_kwh * 3.5,
          plant_availability: parseFloat(plant_avg / 12).toFixed(2)
        })

      }
    }


  }, [energy?.data1])


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

  const convertToReadableValue = (val) => {
    let string = "" + val;
    let arr = string.split("")
    arr.splice(1, 0, ",")
    arr.splice(4, 0, ",")
    arr.splice(7, 0, ",")
    return arr.join("")
  }

  useEffect(() => {
    dispatch(normalizedEnergyDetails())
  }, [dispatch])

  return (

    <>
      {loading ? <SpinLoader /> :
        <>
          {energy?.data1 && energy?.data2 &&
            <div >
              <Grid container paddingBottom={3} boxSizing={"border-box"}>

                <Grid

                  sx={{ boxShadow: 2 }}
                  item
                  lg={11.7}
                  style={{
                    boxSizing: "border-box",
                    borderWidth: "3px",
                    borderRadius: "8px",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    padding: "2rem 1rem",
                    gap: "1rem",
                    height: "290px",
                  }}
                  className="generation_overview_container"
                >

                  <div className="gen_overview_1">

                    <div >

                      <div>
                        <div>
                          <progress className="progress_1" style={{ accentColor: "green" }} value={yearlyDetail.netenergy || 0} max="20000000" />

                        </div>
                        <div>
                          <span>Net Energy (KWh)</span>
                          {/* <span><ArrowDropUpIcon /></span> */}
                          <span
                            style={{
                              position: "absolute",
                              left: ` ${(yearlyDetail.netenergy || 0) * 100 / 20000000 - 2}%`,
                              bottom: "60%"
                            }}
                          ><i class="fa-solid fa-caret-up"></i></span>

                          <span>{convertToReadableValue(yearlyDetail.netenergy)}</span>


                        </div>

                      </div>
                      <div>
                        <div>
                          <progress className="progress_2" style={{ accentColor: progressValue.progress_2 ? "grey" : "red" }} value={yearlyDetail.contructual_energy || 0} max="20000000" />
                        </div>


                        <div>
                          <span>Contractual Energy (KWh)</span>
                          {/* <span style={{fontSize:"1.2rem"}}><ArrowDropUpIcon  /></span> */}
                          <span
                            style={{
                              position: "absolute",
                              left: `${(yearlyDetail.contructual_energy || 0) * 100 / 20000000 - 2}%`,
                              bottom: "60%"
                            }}
                          ><i class="fa-solid fa-caret-up"></i></span>

                          <span>{convertToReadableValue(yearlyDetail.contructual_energy)}</span>
                        </div>
                      </div>
                      <div>
                        <div>
                          <progress className="progress_3" style={{ accentColor: "blue" }} value={-yearlyDetail.ShortFall} max="100" />
                        </div>

                        <div>
                          <span>ShortFall/Excess Percentage (%)</span>
                          {/* <span><ArrowDropUpIcon /></span> */}
                          <span
                            style={{
                              position: "absolute",
                              left: `${-(yearlyDetail.ShortFall || 0) * 100 / 100 - 2}%`,
                              bottom: "60%"
                            }}
                          ><i class="fa-solid fa-caret-up"></i></span>

                          <span>{yearlyDetail.ShortFall}</span>
                        </div>
                      </div>

                    </div>
                    <div>

                      <div>

                        <span>{convertToReadableValue(yearlyDetail.netenergy) || 0}</span>
                        <span>Net Energy Yearly (KWh)  </span>
                        <div>
                          <BarChart width={100} height={40} data={monthlyDetail || []} >
                            <XAxis dataKey="name" hide />
                            {/* <YAxis interval={10} dataKey={() =>

                              energy?.data1?.reduce((acc, curr) => {
                                return curr.net_energy >= acc ? curr.net_energy : acc;
                              }, -Infinity)

                            } hide domain={[
                              energy?.data1?.reduce((acc, curr) => {
                                return curr.net_energy <= acc ? curr.net_energy : acc;
                              }, Infinity),
                              `dataMax`
                            ]} /> */}
                            <Tooltip contentStyle={{ fontSize: "0.7rem" }} />
                            <Bar barSize={4} radius={18} dataKey="net_energy" fill="#8884d8" />
                          </BarChart>
                        </div>
                        <span className="progress_button_1">View</span>

                      </div>
                      <div>
                        <span>{convertToReadableValue(yearlyDetail.contructual_energy) || 0}</span>
                        <span>Contractual Energy Yearly (KWh)</span>
                        <div><BarChart width={100} height={40} data={monthlyDetail || []} >
                          {/* <CartesianGrid /> */}
                          <XAxis dataKey="name" hide />
                          {/* <YAxis  dataKey={() =>

                            energy?.data1?.reduce((acc, curr) => {
                              return curr.contructual_energy >= acc ? curr.contructual_energy : acc;
                            }, -Infinity)

                          } hide domain={[
                            energy?.data1?.reduce((acc, curr) => {
                              return curr.contructual_energy <= acc ? curr.contructual_energy : acc;
                            }, Infinity),
                            `dataMax`
                          ]} /> */}
                          <Tooltip contentStyle={{ fontSize: "0.7rem" }} />
                          <Bar barSize={4} radius={18} dataKey="contructual_energy" fill="#8884d8" />
                        </BarChart></div>
                        <span onMouseOver={() => setProgressValue({ ...progressValue, progress_2: true })} onMouseOut={() => setProgressValue({ ...progressValue, progress_2: false })} className="progress_button_2">View</span>

                      </div>
                      <div>
                        <span>{yearlyDetail.ShortFall}</span>
                        <span>Excess ShortFall Yearly (%)</span>
                        <div>
                          <BarChart width={100} height={40} data={monthlyDetail || []} >
                            <XAxis dataKey="name" hide />
                            {/* <YAxis dataKey={() => 10} hide domain={[-40, `dataMax`]} /> */}
                            <YAxis dataKey={() =>

                              energy?.data1?.reduce((acc, curr) => {
                                return curr.ExcessORShortfall_Percentage >= acc ? curr.ExcessORShortfall_Percentage : acc;
                              }, -Infinity)

                            } hide domain={[
                              energy?.data1?.reduce((acc, curr) => {
                                return curr.ExcessORShortfall_Percentage <= acc ? curr.ExcessORShortfall_Percentage : acc;
                              }, Infinity),
                              `dataMax`
                            ]} />
                            <Tooltip contentStyle={{ fontSize: "0.7rem" }} />
                            <Bar barSize={4} radius={18} dataKey="excess_shortfall_percentage" fill="#8884d8" />
                          </BarChart></div>
                        <span className="progress_button_3">View</span>

                      </div>

                    </div>

                  </div>
                  <div className="gen_overview_2">

                    <div>

                      {/* <AreaChart width={230} height={150} data={graphData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <YAxis hide/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="val" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                      </AreaChart> */}

                      <AreaChart

                        width={402}
                        height={140}
                        data={monthlyDetail || []}

                        margin={{
                          top: 20, right: 20, bottom: 20, left: 20,
                        }}
                      >
                        <XAxis dataKey="name" hide />
                        <YAxis type="number" yAxisId="bar1" dataKey={() => 100} hide domain={[70, `dataMax`]} />
                        <YAxis type="number" yAxisId="bar2" dataKey={() => 100} hide domain={[98, `dataMax`]} />


                        <Area dataKey="actual_pr" yAxisId="bar1" stroke="rgb(11, 165, 119)" strokeWidth={0.2} fill="rgb(20, 213, 149)" />
                        <Area dataKey="plant_availability" yAxisId="bar2" stroke="rgb(11, 165, 119)" strokeWidth={0.2} fill="rgb(91, 248, 201)" />
                        <Tooltip />
                      </AreaChart>

                    </div>

                    <div>

                      <div>
                        <span>{yearlyDetail.actual_pr}</span>
                        <span>Actual PR</span>

                      </div>
                      <span style={{ width: "2px", background: "rgb(166, 176, 173)", height: "90%" }}></span>

                      <div>
                        <span>{yearlyDetail.plant_availability || 0}</span>
                        <span>Plant Availability</span>
                      </div>
                      {/* <span style={{ width: "2px", background: "rgb(166, 176, 173)", height: "90%" }}></span>
                      <div>
                        <span>65</span>
                        <span>Value</span>
                      </div> */}

                    </div>

                  </div>
                  <div className="gen_overview_3">

                    <div>
                      <span>AC Line Loss Percentage</span>
                    </div>

                    <div>
                      <BarChart width={270} height={250} data={monthlyDetail || []} >
                        <XAxis dataKey="name" hide />
                        <YAxis type="number" dataKey={() => 2} hide domain={[1, `dataMax`]} />
                        <Tooltip contentStyle={{ fontSize: "0.7rem" }} />
                        <Bar barSize={10} radius={18} dataKey="ac_loss" fill="rgb(61, 74, 138)" />
                      </BarChart>

                    </div>

                  </div>

                </Grid>

                <Grid item lg={11.7}
                  borderRadius={"14px"}
                  boxSizing={"border-box"}
                  style={{
                    background: "linear-gradient(to bottom, rgb(3, 99, 125),rgb(4, 128, 162),rgb(4, 135, 172))",
                    margin: "auto",
                    marginLeft: "1.2rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem 0"
                  }}>
                  <Grid
                    item
                    lg={11.6}
                    boxSizing={"border-box"}
                    style={{
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem"
                    }}
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
                          // backgroundColor: "rgb(27, 96, 235)",
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
                </Grid>

                <Grid item lg={11.7}
                  borderRadius={"14px"}
                  boxSizing={"border-box"}
                  style={{
                    background: "linear-gradient(to bottom, rgb(3, 99, 125),rgb(4, 128, 162),rgb(4, 135, 172))",
                    margin: "auto",
                    marginLeft: "1.2rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem 0"
                  }}>

                  <Grid
                    item
                    lg={11.6}
                    boxSizing={"border-box"}
                    style={{
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem"
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
                </Grid>

                <Grid item lg={11.7}
                  borderRadius={"14px"}
                  boxSizing={"border-box"}
                  style={{
                    background: "linear-gradient(to bottom, rgb(3, 99, 125),rgb(4, 128, 162),rgb(4, 135, 172))",
                    margin: "auto",
                    marginLeft: "1.2rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem 0"
                  }}>

                  <Grid
                    item
                    lg={11.6}
                    boxSizing={"border-box"}
                    style={{
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem"
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
                </Grid>


                <Grid item lg={11.7}
                  borderRadius={"14px"}
                  boxSizing={"border-box"}
                  style={{
                    background: "linear-gradient(to bottom, rgb(3, 99, 125),rgb(4, 128, 162),rgb(4, 135, 172))",
                    margin: "auto",
                    marginLeft: "1.2rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem 0"
                  }}>



                  <Grid
                    item
                    lg={11.5}
                    boxSizing={"border-box"}
                    style={{
                      borderStyle: "solid",
                      borderColor: "#ed7d31",
                      borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}

                  >

                    <div style={{ height: "100%", paddingTop: "2rem" }}>


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
                                      ContractualEnergy:
                                        !checkBoxChecked?.ContractualEnergy,
                                    });
                                  }}
                                />
                              }
                              label="Contratual Energy"
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
                          height={250}
                          width={750}
                          title="Net Energy Vs Contratual Energy Vs Excess/Shortfall"
                          value1={checkBoxChecked?.NetEnergy}
                          value2={checkBoxChecked?.ContractualEnergy}
                          value3={checkBoxChecked?.ShortFall}
                          dataKey1="netEnergy"
                          dataKey2="contructualEnergy"
                          dataKey3="shortfall"
                          y_axis_label_value1="Energy"
                          y_axis_label_value2="Excess/Shortfall"
                          position={0}
                          barsize={15}
                          legendValues={["Net Energy", "Contractual Energy", "Excess/Shortfall"]}
                        />
                      </div>
                    </div>



                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxSizing: "border-box", paddingTop: "1rem" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          boxSizing: "border-box",

                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#edeaea",
                            borderStyle: "solid",
                            borderColor: "#ed7d31",
                            borderWidth: "3px",
                            borderRadius: "5px",
                            paddingLeft: "1rem",
                            // boxSizing: "border-box",

                          }}
                        >
                          <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked
                                  color="success"
                                  onChange={(e) => {
                                    setCheckedActualPr(!checkedActualPr)
                                  }}
                                />
                              }
                              label="Actual PR"
                            />
                          </FormGroup>
                        </div>
                      </div>


                      <h3 style={{ textAlign: "center" }}>
                        Actual PR
                      </h3>



                      <div style={{ boxSizing: "border-box" }}>

                        <BarChart width={570} height={240} data={energy?.data3 || []} >

                          <XAxis fontSize={12} interval={0} dataKey="name" tickLine={false} />

                          <YAxis type="number" dataKey={() => 100} domain={[50, 'dataMax']} />
                          <Legend
                            payload={
                              [
                                {
                                  value: "Actual PR",
                                  type: "square",
                                  color: "rgb(61, 74, 138)"
                                }
                              ]
                            }
                          />
                          <Tooltip contentStyle={{ fontSize: "0.7rem" }} />
                          {
                            checkedActualPr &&
                            <Bar barSize={20} spacing={0.5} dataKey="Actual_pr" fill="rgb(61, 74, 138)" />
                          }
                        </BarChart>
                      </div>

                    </div>

                  </Grid>

                </Grid>
              </Grid>
            </div>
          }
        </>
      }
    </>
  );
};

export default GenOverView2;

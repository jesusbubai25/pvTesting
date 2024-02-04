import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import "./GenOverView2.css";
import { Grid } from "@mui/material";
import SpeedChart from "../../../../components/SpeedChart";
import { useDispatch, useSelector } from "react-redux";
import { normalizedEnergyDetails } from "../../../../actions/inverterActions";
import SpinLoader from "../../../../components/SpinLoader";
import SelectOptions from "./SelectOptions";
import Printer from "../../../../components/Printer";
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import CustomizeTootip from "../../../../components/CustomizeTootip";
import CustomizeLegend from "../../../../components/CustomizeLegend";
import { colors1, colors3 } from "../../../../colors/color";
import { exportComponentAsJPEG } from 'react-component-export-image'
import Chart from 'react-apexcharts'



const GenOverView2 = () => {
  const { loading, energy } = useSelector(state => state.energy)

  const [initialMonthEnergy, setInitialMonthEnergy] = useState({
    net_energy: null,
    contractual_energy: null,
    excessORShortfall_kwh: null,
    excess_shortfall_percentage: null,
    ac_loss: null,
    actual_pr: null
  })
  const [progressValue, setProgressValue] = useState({
    progress_1: false,
    progress_2: false,
    progress_3: false
  })
  const [progressValueAnimate, setProgressValueAnimate] = useState({
    progress1: false,
    progress2: false,
    progress3: false
  })
  const [yearlyDetail, setYearlyDetail] = useState({
    netenergy: 0,
    contractual_energy: 0,
    ShortFall: 0,
    revenu_loss: 0,
    actual_pr: 0,
    plant_availability: 0
  })


  const [monthlyDetail, setMonthlyDetail] = useState([])

  const [showPRData, setShowPRData] = useState({ showPR: true, all: true });
  const [showEnergyData, setShowEnergyData] = useState({
    netEnergy: true,
    contractualEnergy: true,
    shortFall: true,
    all: true
  })


  const downloadRef1 = useRef(null)
  const downloadRef2 = useRef(null)
  const downloadRef3 = useRef(null)
  const downloadRef4 = useRef(null)
  const downloadRef5 = useRef(null)
  const speedometerRef1 = useRef(null);
  const speedometerRef2 = useRef(null);
  const speedometerRef3 = useRef(null);
  const graphRef1 = useRef(null);
  const graphRef2 = useRef(null);

  const dispatch = useDispatch();

  useMemo(() => {

    if (energy?.data1) {

      let initalmonth = energy?.data1?.find(e => e.month === "January")
      let Yearly = energy?.data1?.find(e => e.month === "Yearly")

      if (!initialMonthEnergy.ac_loss) {
        setInitialMonthEnergy({
          ...initialMonthEnergy,
          net_energy: initalmonth.net_energy,
          contractual_energy: initalmonth.contractual_energy,
          excessORShortfall_kwh: initalmonth.ExcessORShortfall_kwh,
          excess_shortfall_percentage: initalmonth.ExcessORShortfall_Percentage,
          ac_loss: initalmonth.AC_Loss,
          actual_pr: initalmonth.Actual_pr
        })
      }

      if (!yearlyDetail.netenergy || !yearlyDetail.contractual_energy || !yearlyDetail.ShortFall || !yearlyDetail.actual_pr || !yearlyDetail.revenu_loss || !yearlyDetail.plant_availability) {
        setYearlyDetail({
          ...yearlyDetail,
          netenergy: Yearly.net_energy,
          contractual_energy: Yearly.contractual_energy,
          ShortFall: Yearly.ExcessORShortfall_Percentage,
          actual_pr: Yearly.Actual_pr,
          revenu_loss: Yearly.ExcessORShortfall_kwh * 3.5,
          plant_availability: parseFloat(energy?.data4?.reduce((acc, curr) => acc + curr.plant_availability, 0) / 12).toFixed(2)
        })

      }
    }

  }, [energy?.data1])


  const handleChangeYear1 = ({ month, net_energy, contractual_energy }) => {
    setInitialMonthEnergy({
      ...initialMonthEnergy,
      net_energy: net_energy,
      contractual_energy: contractual_energy
    })
  };

  const handleChangeYear2 = ({ month, ExcessORShortfall_kwh, ExcessORShortfall_Percentage }) => {
    setInitialMonthEnergy({
      ...initialMonthEnergy,
      excessORShortfall_kwh: ExcessORShortfall_kwh,
      excess_shortfall_percentage: ExcessORShortfall_Percentage
    })
  };
  const handleChangeYear3 = ({ month, AC_Loss, Actual_pr }) => {
    setInitialMonthEnergy({
      ...initialMonthEnergy,
      ac_loss: AC_Loss,
      actual_pr: Actual_pr
    })
  };


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
      {
        // loading ? <SpinLoader /> :
        <>
          {energy?.data1 && energy?.data2 &&
            <div >
              <Grid container paddingBottom={1} boxSizing={"border-box"}>

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
                          <progress className="progress_1" style={{ accentColor: "green", borderRadius: "14px", border: progressValueAnimate.progress1 ? "3px solid red" : "none" }} value={yearlyDetail.netenergy || 0} max="20000000" />

                        </div>
                        <div>
                          <span>Net Energy (KWh)</span>
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
                          <progress className="progress_2" style={{ accentColor: progressValue.progress_2 ? "grey" : "red", borderRadius: "14px", border: progressValueAnimate.progress2 ? "3px solid black" : "none" }} value={yearlyDetail.contractual_energy || 0} max="20000000" />
                        </div>


                        <div>
                          <span>Contractual Energy (KWh)</span>
                          <span
                            style={{
                              position: "absolute",
                              left: `${(yearlyDetail.contractual_energy || 0) * 100 / 20000000 - 2}%`,
                              bottom: "60%"
                            }}
                          ><i class="fa-solid fa-caret-up"></i></span>

                          <span>{convertToReadableValue(yearlyDetail.contractual_energy)}</span>
                        </div>
                      </div>
                      <div>
                        <div>
                          <progress className="progress_3" style={{ accentColor: "blue", borderRadius: "14px", border: progressValueAnimate.progress3 ? "3px solid red" : "none" }} value={-yearlyDetail.ShortFall} max="100" />
                        </div>

                        <div>
                          <span>ShortFall/Excess Percentage (%)</span>
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
                          <BarChart width={100} height={40} data={
                            energy?.data1?.reduce((acc, curr, index) => {
                              if (index != 0) {
                                acc.push({
                                  name: curr.month,
                                  net_energy: curr.net_energy
                                })
                                return acc;
                              }
                              else return acc;
                            }, [])
                            || []} >
                            <XAxis dataKey="name" hide />
                            <Tooltip content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Net Energy"]} />} />
                            <Bar barSize={4} radius={18} dataKey="net_energy" fill="#8884d8" />
                          </BarChart>
                        </div>
                        <span onMouseEnter={() => setProgressValueAnimate({ ...progressValueAnimate, progress1: true })}
                          onMouseOut={() => setProgressValueAnimate({ ...progressValueAnimate, progress1: false })} className="progress_button_1">View</span>

                      </div>
                      <div>
                        <span>{convertToReadableValue(yearlyDetail.contractual_energy) || 0}</span>
                        <span>Contractual Energy Yearly (KWh)</span>
                        <div><BarChart width={100} height={40} data={
                          energy?.data1?.reduce((acc, curr, index) => {
                            if (index != 0) {
                              acc.push({
                                name: curr.month,
                                contractual_energy: curr.contractual_energy
                              })
                              return acc;
                            }
                            else return acc;
                          }, [])
                          || []} >
                          <XAxis dataKey="name" hide />
                          <Tooltip content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Contractual Energy"]} />} />
                          <Bar barSize={4} radius={18} dataKey="contractual_energy" fill="#8884d8" />
                        </BarChart></div>
                        <span onMouseOver={() => setProgressValueAnimate({ ...progressValueAnimate, progress2: true })} onMouseOut={() => setProgressValueAnimate({ ...progressValueAnimate, progress2: false })} className="progress_button_2">View</span>

                      </div>
                      <div>
                        <span>{yearlyDetail.ShortFall}</span>
                        <span>Excess ShortFall Yearly (%)</span>
                        <div>
                          <BarChart width={100} height={40} data={
                            energy?.data1?.reduce((acc, curr, index) => {
                              if (index != 0) {
                                acc.push({
                                  name: curr.month,
                                  excess_shortfall_percentage: curr.ExcessORShortfall_Percentage
                                })
                                return acc;
                              }
                              else return acc;
                            }, []) || []} >
                            <XAxis dataKey="name" hide />
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
                            <Tooltip content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Excess/Shortfall Percentage"]} />} />
                            <Bar barSize={4} radius={18} dataKey="excess_shortfall_percentage" fill="#8884d8" />
                          </BarChart></div>
                        <span className="progress_button_3" onMouseOver={() => setProgressValueAnimate({ ...progressValueAnimate, progress3: true })} onMouseOut={() => setProgressValueAnimate({ ...progressValueAnimate, progress3: false })}>View</span>

                      </div>

                    </div>

                  </div>
                  <div className="gen_overview_2">

                    <div>
                      <AreaChart
                        width={402}
                        height={140}
                        data={
                          energy?.data1?.reduce((acc, curr, index) => {
                            if (index != 0) {
                              acc.push({
                                name: curr.month,
                                actual_pr: curr.Actual_pr,
                                plant_availability: energy?.data4[index - 1].plant_availability
                              })
                              return acc;
                            }
                            else return acc;
                          }, [])

                          || []}

                        margin={{
                          top: 20, right: 20, bottom: 20, left: 20,
                        }}
                      >
                        <XAxis dataKey="name" hide />
                        <YAxis type="number" yAxisId="bar1"

                          dataKey={() => 100} hide domain={[70, `dataMax`]}
                        //  dataKey={() => monthlyDetail?.reduce((acc, curr, index) => Math.max(curr.Actual_pr,acc) , -Infinity)}
                        //       domain={[monthlyDetail?.reduce((acc, curr, index) =>Math.min(curr.plant_availability,acc), Infinity), 'dataMax']}
                        />
                        <YAxis type="number" yAxisId="bar2"
                          dataKey={() => 99.5} hide domain={[98, `dataMax`]}
                        //  dataKey={() => Math.ceil(energy?.data3?.reduce((acc, curr, index) => curr.Actual_pr > acc ? curr.Actual_pr : acc, -Infinity)) + 1}
                        //       domain={[Math.floor(energy?.data3?.reduce((acc, curr, index) => curr.Actual_pr < acc ? curr.Actual_pr : acc, Infinity)) - 1, 'dataMax']}
                        />


                        <Area dataKey="actual_pr" yAxisId="bar1" stroke="rgb(11, 165, 119)" strokeWidth={0.2} fill="rgb(20, 213, 149)" />
                        <Area dataKey="plant_availability" yAxisId="bar2" stroke="rgb(11, 165, 119)" strokeWidth={0.2} fill="rgb(91, 248, 201)" />
                        <Tooltip content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Actual PR", "Plant Availability"]} />} />
                      </AreaChart>

                    </div>

                    <div>

                      <div>
                        <span>{yearlyDetail.actual_pr}</span>
                        <span>Actual PR (%)</span>

                      </div>
                      <span style={{ width: "2px", background: "rgb(166, 176, 173)", height: "90%" }}></span>

                      <div>
                        <span>{parseFloat(energy?.data4?.reduce((acc, curr) => acc + curr.plant_availability, 0) / 12).toFixed(2)}</span>
                        <span>Plant Availability (%) </span>
                      </div>
                    </div>

                  </div>
                  <div className="gen_overview_3">

                    <div>
                      <span>AC Line Loss Percentage (%)</span>
                    </div>

                    <div>
                      <BarChart width={270} height={250} data={
                        energy?.data1?.reduce((acc, curr, index) => {
                          if (index == 0) return acc;
                          else {
                            acc.push({
                              name: curr?.month.substr(0, 3),
                              ac_loss: curr?.AC_Loss
                            })
                            return acc;
                          }

                        }, [])
                        || []} >
                        <XAxis axisLine={false} dataKey="name" interval={0} fontSize={"0.6rem"} tickMargin={8} fontWeight={600} tickLine={false} angle={false} display={false}
                        />
                        <YAxis type="number" dataKey={() => 2} hide domain={[1, `dataMax`]} />
                        <Tooltip cursor={{ fill: "none" }} content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Ac Loss"]} />} />
                        <Bar barSize={10} radius={18} dataKey="ac_loss" fill="rgb(61, 74, 138)" >
                          {/* <LabelList dataKey="ac_loss" position="top" fontSize={"0.65rem"} fontWeight={600} fontFamily="Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" /> */}


                        </Bar>
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
                      // borderStyle: "solid",
                      // borderColor: "#ed7d31",
                      // borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem"
                    }}
                    ref={speedometerRef1}
                  >
                    <Printer clickhandler={() => downloadRef1.current.link.click()}
                      jpgDownload={() =>
                        setTimeout(async () => {
                          exportComponentAsJPEG(speedometerRef1, document.getElementById("greenenco").style.display = "block")
                          document.getElementById("greenenco").style.display = "none"
                        }, 100)

                      }

                      svgDownload={async () => {
                        document.getElementById("hide_content").style.display = "none"
                        const svgData = await saveToSvg(speedometerRef1.current,
                          document.getElementById("greenenco").style.display = "block",
                        )
                        document.getElementById("greenenco").style.display = "none"
                        document.getElementById("hide_content").style.display = "flex"

                        saveAs(svgData, 'gaugemeter.svg')
                      }}
                    />
                    <CSVLink
                      data={energy?.data1?.reduce((acc, curr) => {
                        acc.push({
                          Month: curr.month,
                          NetEnergy: curr.net_energy,
                          ContractualEnergy: curr.contractual_energy
                        })
                        return acc;

                      }, [])}
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
                        title={`Net Energy (KWh)`}
                        minValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.net_energy) : acc, Infinity) -
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.net_energy) : acc, Infinity) % 100000
                          || 10000000
                        }
                        maxValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.net_energy) : acc, -Infinity) +
                          100000 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.net_energy) : acc, -Infinity) % 100000
                          || 20000000
                        }
                        value={initialMonthEnergy.net_energy}
                      // segments={4}
                      />
                      <SpeedChart
                        title={`Contractual Energy (KWh)`}
                        minValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.contractual_energy) : acc, Infinity) -
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.contractual_energy) : acc, Infinity) % 100000
                          || 10000000
                        }
                        maxValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.contractual_energy) : acc, -Infinity) +
                          100000 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.contractual_energy) : acc, -Infinity) % 100000
                          || 20000000
                        }
                        value={initialMonthEnergy.contractual_energy}
                      />
                    </div>
                    <div id="greenenco" style={{ position: "relative", display: "none" }}>
                      <div style={{ position: "absolute", bottom: "0", right: "0", padding: "0 0.5rem 0.5rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "1.2rem" }}>&#169;</span>
                        <span>GreenEnco</span>
                      </div>
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
                      // borderStyle: "solid",
                      // borderColor: "#ed7d31",
                      // borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem"
                    }}
                    ref={speedometerRef2}
                  >
                    <Printer clickhandler={() => downloadRef2.current.link.click()}
                      jpgDownload={() =>
                        setTimeout(async () => {
                          exportComponentAsJPEG(speedometerRef2, document.getElementById("greenenco2").style.display = "block")
                          document.getElementById("greenenco2").style.display = "none"
                        }, 100)

                      }
                      svgDownload={async () => {
                        document.getElementsByClassName("links_div")[1].style.display = "none"
                        const svgData = await saveToSvg(speedometerRef2.current,
                          document.getElementById("greenenco2").style.display = "block")
                        document.getElementById("greenenco2").style.display = "none"
                        document.getElementsByClassName("links_div")[1].style.display = "flex"


                        saveAs(svgData, 'gaugemeter.svg')
                      }}

                    />


                    <CSVLink
                      data={energy?.data1?.reduce((acc, curr) => {
                        acc.push({
                          Month: curr.month,
                          ExcessShortfall: curr.ExcessORShortfall_kwh,
                          ExcessShortfallPercentage: curr.ExcessORShortfall_Percentage
                        })
                        return acc;

                      }, [])}
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
                        title={`Excess Shortfall (KWh)`}
                        minValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.ExcessORShortfall_kwh) : acc, Infinity)
                          - 100000 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.ExcessORShortfall_kwh) : acc, Infinity) % 100000
                          || 10000000
                        }
                        maxValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.ExcessORShortfall_kwh) : acc, -Infinity) +
                          100000 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.ExcessORShortfall_kwh) : acc, -Infinity) % 100000
                          || 20000000
                        }
                        value={initialMonthEnergy.excessORShortfall_kwh}
                      />
                      <SpeedChart
                        title={`Excess/Shortfall Percentage (%)`}
                        minValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.ExcessORShortfall_Percentage) : acc, Infinity)
                          - 10 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.ExcessORShortfall_Percentage) : acc, Infinity) % 10
                        }
                        maxValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.ExcessORShortfall_Percentage) : acc, -Infinity)
                          +
                          10 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.ExcessORShortfall_Percentage) : acc, -Infinity) % 10
                        }
                        value={initialMonthEnergy.excess_shortfall_percentage}
                      />
                    </div>
                    <div id="greenenco2" style={{ position: "relative", display: "none" }}>
                      <div style={{ position: "absolute", bottom: "0", right: "0", padding: "0 0.5rem 0.5rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "1.2rem" }}>&#169;</span>
                        <span>GreenEnco</span>
                      </div>
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
                      // borderStyle: "solid",
                      // borderColor: "#ed7d31",
                      // borderWidth: "3px",
                      borderRadius: "5px",
                      background: "white",
                      paddingTop: "1rem"
                    }}
                    ref={speedometerRef3}
                  >
                    <Printer clickhandler={() => downloadRef3.current.link.click()}
                      jpgDownload={() =>
                        setTimeout(async () => {
                          exportComponentAsJPEG(speedometerRef3, document.getElementById("greenenco3").style.display = "block")
                          document.getElementById("greenenco3").style.display = "none"
                        }, 100)
                      }
                      svgDownload={async () => {
                        setTimeout(async () => {
                          document.getElementsByClassName("links_div")[2].style.display = "none"
                          const svgData = await saveToSvg(speedometerRef3.current,
                            document.getElementById("greenenco3").style.display = "block")
                          document.getElementById("greenenco3").style.display = "none"
                          document.getElementsByClassName("links_div")[2].style.display = "flex"
                          saveAs(svgData, 'gaugemeter.svg')
                        }, 100)

                      }}
                    />
                    <CSVLink
                      data={energy?.data1?.reduce((acc, curr) => {
                        acc.push({
                          Month: curr.month,
                          ActualPR: curr.Actual_pr,
                          AcLoss: curr.AC_Loss
                        })
                        return acc;

                      }, [])}
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
                        title={`Actual PR (%)`}
                        minValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.Actual_pr) : acc, Infinity)
                          - 10 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.Actual_pr) : acc, Infinity) % 10
                        }
                        maxValue={
                          energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.Actual_pr) : acc, -Infinity)
                          +
                          10 - energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.Actual_pr) : acc, -Infinity) % 10
                        }
                        value={initialMonthEnergy.actual_pr}
                      />
                      <SpeedChart
                        title={`AC Line Loss Percentage (%)`}
                        minValue={
                          Math.round(energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.min(acc, curr.AC_Loss) : acc, Infinity))
                        }
                        maxValue={
                          Math.round(energy?.data1?.reduce((acc, curr, index) => index != 0 ? Math.max(acc, curr.AC_Loss) : acc, -Infinity))
                        }
                        value={initialMonthEnergy.ac_loss}
                      />
                    </div>
                    <div id="greenenco3" style={{ position: "relative", display: "none" }}>
                      <div style={{ position: "absolute", bottom: "0", right: "0", padding: "0 0.5rem 0.5rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "1.2rem" }}>&#169;</span>
                        <span>GreenEnco</span>
                      </div>
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
                    padding: "1.2rem"
                  }}>

                  <Grid container display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"1rem"}  >

                    <Grid
                      item
                      lg={5.9}
                      // border={3}
                      // borderColor={"#ed7d31"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      position={"relative"}
                      bgcolor={"white"}
                      borderRadius={"14px"}
                      paddingTop={"1.5rem"}
                    >

                      <div
                        style={{
                          height: "max-content",
                          width: "max-content",
                          // position:"relative"
                        }}
                      >
                        <div style={{ width: "100%", textAlign: "end", position: "absolute", right: "10px", top: "20px" }}>
                          <Printer
                            clickhandler={() => downloadRef4.current.link.click()}
                            jpgDownload={() => {
                              document.getElementsByClassName("cpy_right")[0].style.display = "block";
                              exportComponentAsJPEG(graphRef1, { fileName: "graph" })
                              document.getElementsByClassName("cpy_right")[0].style.display = "none";

                            }
                            }
                            svgDownload={async () => {
                              document.getElementsByClassName("cpy_right")[0].style.display = "block";
                              const svgData = await saveToSvg(graphRef1.current.container)
                              document.getElementsByClassName("cpy_right")[0].style.display = "none";
                              saveAs(svgData, 'graph.svg')
                            }}
                          />
                        </div>
                        <CSVLink
                          data={energy?.data2?.reduce((acc, curr) => {
                            acc.push({
                              Month: curr.name,
                              NetEnergy: curr.netEnergy,
                              ContractualEnergy: curr.contractualEnergy,
                              ExcessShortfall: curr.shortfall

                            })
                            return acc;
                          }, []) || []}
                          filename='data.csv'
                          className='hidden'
                          target='_blank'
                          ref={downloadRef4}
                        />

                        <h4 style={{ textAlign: "center" }}>
                          Net Energy (KWh)  vs Contratual Energy (KWh)  vs Excess/Shortfall (%)
                        </h4>
                        <ComposedChart
                          ref={graphRef1}
                          width={650}
                          height={263}
                          data={energy?.data2 || []}
                          margin={{
                            top: 20,
                            right: 10,
                            bottom: 20,
                            left: 20,
                          }}
                        >
                          <CartesianGrid stroke="grey" strokeWidth={0.2} />
                          {/* <CartesianGrid strokeDasharray={["3 3"]} /> */}
                          <XAxis
                            dataKey="name"
                            fontSize={10} fontWeight={600}
                            tickLine={false} axisLine={false} tickMargin={5}
                          />

                          <YAxis tickFormatter={(v) => v >= 1000 ? parseFloat(v / 1000).toFixed(0) + "k" : v} yAxisId="left-axis"
                            //  label={{ value: "Energy", angle: -90,x:20, position: "insideLeft"}} 
                            label={<AxisLabel axisType='yAxis' x={-27} y={-2}>Energy</AxisLabel>}

                            dataKey={() => Math.ceil(energy?.data2?.reduce((acc, curr, index) => Math.max(curr.netEnergy, curr.contractualEnergy, acc), -Infinity)) + 100000}
                            domain={[Math.floor(energy?.data2?.reduce((acc, curr, index) => Math.min(curr.netEnergy, curr.contractualEnergy, acc), Infinity)) - 100000, 'dataMax']}
                            tickLine={false} tickMargin={8} tickCount={7}
                          />
                          <YAxis

                            yAxisId="right-axis"
                            orientation="right"
                            // label={{
                            //   value: `Excess/Shortfall`,
                            //   angle: -90,
                            //   position: "insideTopRight",
                            //   color: "yellow"
                            // }}
                            label={<AxisLabel axisType='yAxis' x={42} y={347}>Excess/Shortfall</AxisLabel>}
                            tickLine={false} tickMargin={8} minTickGap={2}
                          />
                          <XAxis

                            orientation="right"
                          // label={{
                          //   value: `Excess/Shortfall`,
                          //   angle: -90,
                          //   position: "insideTopRight",
                          //   color: "yellow"
                          // }}
                          // label={<AxisLabel axisType='yAxis' x={40} y={347}>@greenenco</AxisLabel>}
                          // tickLine={false} tickMargin={8} minTickGap={2}
                          />
                          <Tooltip cursor={{ fill: "none" }} content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Net Energy", "Contractual Energy", "Excess/Shortfall"]} />} />
                          <Legend
                            content={<CustomizeLegend active={false} payload={[]} LegendValues={["Net Energy", "Contractual Energy", "Excess/Shortfall"]} data={showEnergyData} setData={setShowEnergyData} />}
                          />
                          <Bar
                            hide={showEnergyData.netEnergy ? false : true}
                            dataKey="netEnergy"
                            barSize={12}
                            // fill="#122b4f"
                            fill={`${colors3[0]}`}
                            yAxisId="left-axis"
                          />
                          <Bar
                            hide={showEnergyData.contractualEnergy ? false : true}


                            dataKey="contractualEnergy"
                            barSize={12}
                            // fill="#ed7d31"
                            fill={`${colors3[1]}`}
                            yAxisId="left-axis"
                          />
                          <Line
                            hide={showEnergyData.shortFall ? false : true}

                            type="monotone"
                            dataKey="shortfall"
                            strokeWidth={3}
                            stroke={`${colors1[4]}`}
                            yAxisId="right-axis"
                          />
                        </ComposedChart>

                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={5.9}
                      // border={3}
                      // borderColor={"#ed7d31"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      position={"relative"}
                      bgcolor={"white"}
                      borderRadius={"14px"}
                      padding={"1rem 0"}
                    >


                      <div
                        style={{
                          height: "max-content",
                          width: "max-content",
                          // position:"relative"
                        }}
                      >
                        <div style={{ width: "100%", textAlign: "end", position: "absolute", right: "10px", top: "20px" }}>
                          <Printer clickhandler={() => downloadRef5.current.link.click()}
                            jpgDownload={() => {
                              document.getElementsByClassName("cpy_right")[1].style.display = "block";
                              exportComponentAsJPEG(graphRef2, { fileName: "graph" })
                              document.getElementsByClassName("cpy_right")[1].style.display = "none";
                            }
                            }
                            svgDownload={async () => {
                              document.getElementsByClassName("cpy_right")[1].style.display = "block";
                              const svgData = await saveToSvg(graphRef2.current.container)
                              document.getElementsByClassName("cpy_right")[1].style.display = "none";

                              saveAs(svgData, 'graph.svg')
                            }} />
                        </div>
                        <CSVLink
                          data={energy?.data3?.reduce((acc, curr) => {
                            acc.push({
                              Month: curr.name,
                              ActualPR: curr.Actual_pr
                            })
                            return acc;
                          }, []) || []}
                          filename='data.csv'
                          className='hidden'
                          target='_blank'
                          ref={downloadRef5}
                        />

                        <h4 style={{ textAlign: "center" }}>
                          Actual PR (%)
                        </h4>
                        <ComposedChart

                          ref={graphRef2}
                          width={650}
                          height={255}
                          data={energy?.data3 || []}
                          margin={{
                            top: 20,
                            right: 10,
                            bottom: 20,
                            left: 20,
                          }}

                        >
                          <XAxis fontSize={12} interval={0} dataKey="name" tickLine={false} axisLine={false} tickMargin={5}

                          />
                          {/* <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" /> */}
                          <CartesianGrid stroke="grey" strokeWidth={0.3} />


                          <YAxis type="number"
                            dataKey={() => Math.ceil(energy?.data3?.reduce((acc, curr, index) => curr.Actual_pr > acc ? curr.Actual_pr : acc, -Infinity)) + 1}
                            domain={[Math.floor(energy?.data3?.reduce((acc, curr, index) => curr.Actual_pr < acc ? curr.Actual_pr : acc, Infinity)) - 1, 'dataMax']}
                            tickLine={false} tickMargin={8} tickCount={6}
                          />
                          {/* <defs>
{energy?.data3?.map((color, index) => (
  <linearGradient id={`colorUv${index}`} x1='0' y1='0' x2='100%' y2='0' spreadMethod='reflect'>
    <stop offset='0' stopColor='#1a1a1a' />
    <stop offset='1' stopColor={colors3[0]} />
  </linearGradient>
 ))} 
</defs> */}
                          <Legend content={<CustomizeLegend active={false} payload={[]} label={""} LegendValues={["Actual PR"]} data={showPRData} setData={setShowPRData} />}
                          />
                          <Tooltip cursor={{ fill: "none" }} content={<CustomizeTootip active={false} payload={[]} label={""} TooltipValues={["Actual PR"]} />} contentStyle={{ fontSize: "0.7rem" }} />

                          {
                            <Bar barSize={30} spacing={0.5} hide={showPRData.showPR ? false : true} dataKey="Actual_pr" fill={colors3[0]} onTransitionEnd={"1s all"} >

                              {/* {energy?.data3?.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
  ))} */}
                              <LabelList style={{ zIndex: 6 }} dataKey="Actual_pr" position="top" fontSize={"0.65rem"} fontWeight={600} fontFamily="Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" />
                            </Bar>
                          }
                        </ComposedChart>

                      </div>

                    </Grid>
                  </Grid>
                  {/* <Grid
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

                  > */}
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



export const AxisLabel = ({ axisType, x = 10, y = 90, width = 50, height = 50, stroke, children }) => {
  const isVert = axisType === 'yAxis';
  const cx = isVert ? x : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text className="animation_label" style={{ boxSizing: "border-box" }} enableBackground={true} x={`${cx}%`} y={`${cy}%`} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
      {children}
    </text>
  );
};

const saveToSvg = (svg, width, height) => {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    let xml = new XMLSerializer().serializeToString(svg);
    let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
    resolve(dataUrl)
  });
};

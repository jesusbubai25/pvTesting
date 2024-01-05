import React, { createContext, useState } from "react";
import PieChartComp from "../../../../components/PieChartComp";
import { Checkbox, FormLabel, Grid } from "@mui/material";
import { colors1 } from "../../../../colors/color";
import trasmission_tower from '../../../../fonts and images/transmission.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import amrMeter from '../../../../fonts and images/amr_meter.jpeg'
import transformer from '../../../../fonts and images/transformer.jpg'
import inverter from '../../../../fonts and images/inverter.jpg'
import scada from '../../../../fonts and images/scada.jpg'
import './LossFlow.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WbSunnyIcon from '@mui/icons-material/WbSunny';



const LossFlow2 = () => {
    const [data, setData] = useState([
        { name: "Inverter Level DC Site Loss", value: 6.5, fill: colors1[0] },
        { name: "Soiling Loss", value: 3.5, fill: colors1[3] },
        { name: "Cable Loss", value: 1.0, fill: colors1[2] },

    ]);

    const [value, setValue] = useState(null)
    const [percentage, setPercentage] = useState(null)
    const [name, setname] = useState(null)
    return (
        <Grid container spacing={2} minHeight={650}>
            <Grid
                item
                lg={11}
                style={{
                    borderStyle: "solid",
                    borderColor: "#ed7d31",
                    borderRadius: "5px",
                    marginTop: "10px",
                    marginLeft: "70px",
                    position: "relative",
                    display: "flex",
                    // alignItems:"center",
                    // justifyContent:"center"
                }}
            >
                {/* <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>
                    Loss Flow Diagram
                </h1> */}
                {/* <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <PieChartComp
              data={data}
              height={500}
              width={900}
              title="Loss Flow Diagram"
              setValue={setValue}
              setPercentage={setPercentage}
              setname={setname}
            />
          </div>
          <div style={{ paddingTop: "2rem", width: "100%", display: "flex", alignItems: "self-start", justifyContent: "center" }}>
            <div>
              <h2>{name}</h2>
              <h2>PV: {value || 0}</h2>
              <h2>Rate: {percentage || 0}%</h2>
            </div>


          </div>
        </div> */}
                <div style={{ display: "flex", flexDirection: "column", height: "90%", justifyContent: "space-between" }} >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img style={{ height: "120px", width: "80px" }} src={trasmission_tower} title="Transmission Tower" />
                            <span style={{ fontSize: "0.9rem", width: "90px", textAlign: "center", fontWeight: "700" }}>Transmission Tower</span>
                        </div>
                        <ArrowBackIcon sx={{ width: "100px", fontSize: "4rem" }} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img style={{ height: "50px", width: "50px" }} src={amrMeter} title="Ammeter" />
                            <span style={{ fontSize: "0.9rem", width: "90px", textAlign: "center", fontWeight: "700", position: "relative", top: "20px" }}>Ammeter</span>
                        </div>
                        <ArrowBackIcon sx={{ width: "100px", fontSize: "4rem" }} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img style={{ height: "170px", width: "150px" }} src={transformer} title="Transformer" />

                            <span style={{ fontSize: "0.9rem", width: "90px", textAlign: "center", fontWeight: "700" }}>Transformer</span>
                        </div>
                        <ArrowBackIcon sx={{ width: "100px", fontSize: "4rem" }} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                            <img style={{ height: "170px", width: "150px" }} src={inverter} title="Inverter" />
                            <span style={{ fontSize: "0.9rem", width: "90px", textAlign: "center", fontWeight: "700" }}>Inverter</span>


                        </div>
                        {/* <ArrowBackIcon sx={{ width: "100px", fontSize: "4rem" }} /> */}
                        <div style={{ marginLeft: "2rem", position: "relative" }}>
                            <div style={{ position: "relative" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <img style={{ height: "120px", width: "150px" }} src={scada} title="SCADA" />

                                    <span style={{ fontSize: "0.9rem", width: "90px", textAlign: "center", fontWeight: "700" }}>SCADA</span>



                                </div>
                            </div>
                            <div style={{ position: "absolute", height: "100%", width: "8px", backgroundColor: "black", left: "50%" }}>

                                <div style={{ position: "absolute", height: "8px", width: "11.5vw", backgroundColor: "black", right: "0", bottom: "0" }}>
                                    <div style={{ position: "absolute", height: "14vh", width: "8px", backgroundColor: "black", left: "0", bottom: "0" }}>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div style={{display:"flex",gap:"0.5rem",position:"relative"}}>
                    <div style={{width:"65%",height:"4px",backgroundColor:"rgb(86, 198, 45)",position:"absolute",top:"50%",marginLeft:"19.5px"}}></div> */}
                    {/* <div style={{width:"65%",height:"4px",backgroundColor:"rgb(86, 198, 45)",position:"absolute",top:"10px",marginLeft:"19.5px"}}></div> */}

                    {/* <div style={{width:"100%",height:"10%",display:"flex",alignItems:"flex-start",border:"2px solid red"}}>
                        <WbSunnyIcon sx={{ color: "red", fontSize: "5rem" ,border:"2px solid red"}} /> */}

                    <div style={{
                        position: "absolute",
                        top: "40%",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <WbSunnyIcon sx={{
                                color: "#FDB813", fontSize: "5rem"
                            }} />
                            <span
                                style={{ fontSize: "0.7rem", width: "70px", textAlign: "center", fontWeight: "700" }}
                            >Sun</span>
                        </div>

                    </div>
                    <div style={{
                        display: "flex", flexDirection: "column", width: "40%",
                        height: "50%", justifyContent: "space-between", alignItems: "center", marginLeft: "9rem"
                    }}>


                        <div className="smb_box">
                            SMB BOX
                            <div style={{
                                width: "8px", height: "61%", position: "absolute", bottom: "100%",
                                backgroundColor: "red",
                                // backgroundColor:"rgb(86, 198, 45)",
                                left: "50%", boxShadow: "none"
                            }}>

                                <div style={{
                                    height: "8px",
                                    width: "22vw",
                                    // backgroundColor:"rgb(86, 198, 45)",
                                    backgroundColor: "red",
                                    position: "absolute",
                                    top: "0px"



                                }}>
                                    <div style={{
                                        width: "8px", height: "14vh",
                                        // backgroundColor:"rgb(86, 198, 45)"
                                        backgroundColor: "red"
                                        , position: "absolute", right: "0", bottom: "0"
                                    }}>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="solar_box" >

                            <div className="solar_pannel_box">
                                <div className="solar_pannel_item1"></div>
                                <div className="solar_pannel_item2"></div>
                                <div className="solar_pannel_item3"></div>
                                <div style={{
                                    height: "74%", position: "absolute", bottom: "100%",
                                    background: "none",
                                    borderLeft: "5px dashed rgb(67,176,239)",
                                    left: "50%", boxShadow: "none"
                                }}>

                                </div>

                            </div>
                            <div className="solar_pannel_box">
                                <div className="solar_pannel_item1"></div>
                                <div className="solar_pannel_item2"></div>
                                <div className="solar_pannel_item3"></div>
                                <div style={{
                                    height: "74%", position: "absolute", bottom: "100%",
                                    background: "none",
                                    borderLeft: "5px dashed rgb(67,176,239)",
                                    left: "50%", boxShadow: "none"
                                }}></div>

                            </div>
                            <div className="solar_pannel_box">
                                <div className="solar_pannel_item1"></div>
                                <div className="solar_pannel_item2"></div>
                                <div className="solar_pannel_item3"></div>
                                <div style={{
                                    height: "74%", position: "absolute", bottom: "100%",
                                    background: "none",
                                    borderLeft: "5px dashed rgb(67,176,239)",
                                    left: "50%", boxShadow: "none"
                                }}></div>

                            </div>
                            <div className="solar_pannel_box">
                                <div className="solar_pannel_item1"></div>
                                <div className="solar_pannel_item2"></div>
                                <div className="solar_pannel_item3"></div>
                                <div style={{
                                    height: "74%", position: "absolute", bottom: "100%",
                                    background: "none",
                                    borderLeft: "5px dashed rgb(67,176,239)",
                                    left: "50%", boxShadow: "none"
                                }}></div>

                            </div>
                        </div>
                    </div>
                    {/* </div> */}



                </div>

                <div style={{ display: "flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",border:"2px solid red" }}>
                    <div>
                        <Checkbox
                            id="check1"
                            defaultChecked
                            color="success"

                        />
                        <FormLabel htmlFor="check1">Check1</FormLabel>
                    </div>

                    <div>
                        <Checkbox
                            id="check2"
                            defaultChecked
                            color="success"

                        />
                        <FormLabel htmlFor="check2">Check2</FormLabel>
                    </div>
                    <div>
                        <Checkbox
                            id="check3"
                            defaultChecked
                            color="success"

                        />
                        <FormLabel htmlFor="check3">Check3</FormLabel>
                    </div>

                </div>

                {/* <spna>Umbrella Icon</spna>
                <svg className="umbrella" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
                    <title style={{ color: "black" }}>Umbrella Icon</title>
                    <path d="M27 14h5c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2v0zM27 14c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2v0 14c0 1.112-0.895 2-2 2-1.112 0-2-0.896-2-2.001v-1.494c0-0.291 0.224-0.505 0.5-0.505 0.268 0 0.5 0.226 0.5 0.505v1.505c0 0.547 0.444 0.991 1 0.991 0.552 0 1-0.451 1-0.991v-14.009c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5 2c0-5.415 6.671-9.825 15-9.995v-1.506c0-0.283 0.224-0.499 0.5-0.499 0.268 0 0.5 0.224 0.5 0.499v1.506c8.329 0.17 15 4.58 15 9.995h-5z" />
                </svg> */}
            </Grid>
        </Grid>
    );
};

export default LossFlow2;

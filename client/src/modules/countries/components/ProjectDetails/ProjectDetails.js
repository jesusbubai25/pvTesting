import React, { useEffect, useRef, useState } from "react";
import "../CountryHeader.css";
import GreenLogo from "../../../../newLogo.PNG";
import { useNavigate } from "react-router-dom";
import PageURL from "../../../../constants/PageURL";

import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from "@mui/material";

const data1 = [
    {
        country: "India",
        projectName: ["In_Project1", "In_Project2", "In_Project3", "In_Project4"],
        block: ["in_block1", "in_block2"]


    }, {
        country: "Uk",
        projectName: ["uk_Project1", "uk_Project2", "uk_Project3", "uk_Project4"],
        block: ["uk_block1", "uk_block2"]

    }, {
        country: "France",
        projectName: ["Project1", "Project2", "Project3", "Project4"],
        block: ["block1", "block2"],

    }, {
        country: "India",
        projectName: ["Italy", "Project2", "Project3", "Project4"],
        block: ["block1", "block2"],

    }, {
        country: "Thailand",
        projectName: ["Project1", "Project2", "Project3", "Project4"],
        block: ["block1", "block2"],

    }
]


const ProjectDetails = (props) => {
    const [data, setdata] = useState(data1)
    const [country, setCountry] = useState("")
    const [projectName, setprojectName] = useState("")
    const [block, setBlock] = useState("")
    const navigate = useNavigate();


    const handleChange1 = (event) => {
        setCountry(event.target.value)
    };
    const handleChange2 = (event) => {
        setprojectName(event.target.value)
    };
    const handleChange3 = (event) => {
        setBlock(event.target.value)
    };

    useEffect(() => {

    }, [country])

    return (
        <div className="header" style={{ justifyContent: "space-around" }}>
            <div className="logo">
                <img onClick={() => navigate(PageURL.COUNTRYDEFAULT)}
                    src={GreenLogo}
                    style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                    alt="Greenenco-Logo"
                />
            </div>

            <div className="title" style={{ width: "80%", justifyContent: "space-between" }}  >
                <div>
                    <h1 style={{ color: "#ed7d31", fontSize: "140%" }}>
                        Creating Climate To Live In A Better World
                    </h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>

                    <div className="dropdown">

                        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
                            <InputLabel id="demo-simple-select-filled-label" style={{ color: "black", fontWeight: "800" }}>Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={country}
                                onChange={handleChange1}
                                style={{ backgroundColor: "#ed7d31" }}
                            >
                                <MenuItem ><em>None</em> </MenuItem>

                                {
                                    data.map((value, index) => {
                                        return <MenuItem key={index} value={index}>{value.country}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>

                    </div>
                    <div className="dropdown">
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
                            <InputLabel id="demo-simple-select-filled-label1" style={{ color: "black", fontWeight: "800" }}>Project name</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label1"
                                id="demo-simple-select-filled1"
                                onChange={handleChange2}
                                value={projectName}
                                style={{ backgroundColor: "#ed7d31" }}
                            >
                                <MenuItem><em>None</em> </MenuItem>

                                {
                                    data[country]?.projectName.map((value, index) => {
                                        return <MenuItem key={index} value={value}>{value}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="dropdown">
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
                            <InputLabel id="demo-simple-select-filled-label2" style={{ color: "black", fontWeight: "800" }}>Block</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label2"
                                id="demo-simple-select-filled2"
                                onChange={handleChange3}
                                value={block}
                                style={{ backgroundColor: "#ed7d31" }}
                            >
                                <MenuItem><em>None</em> </MenuItem>
                                {
                                    data[country]?.block.map((value, index) => {
                                        console.log(value, index)
                                        return <MenuItem key={index} value={value}>{value}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="dropdown">
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }}>
                            <InputLabel id="demo-simple-select-filled-label4" style={{ color: "black", fontWeight: "800" }}>Project Details</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label4"
                                id="demo-simple-select-filled4"
                                // onChange={handleChange4}
                                // value={projectDetails}
                                style={{ backgroundColor: "#ed7d31" }}
                            >
                                <MenuItem>None</MenuItem>
                                {/* {
                                    data[country]?.block.map((value, index) => {
                                        console.log(value, index)
                                        return <MenuItem key={index} value={value}>{value}</MenuItem>
                                    })
                                } */}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProjectDetails;

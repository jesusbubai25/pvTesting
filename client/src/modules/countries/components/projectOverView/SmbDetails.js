import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { powerPlantDetail } from "../../../../actions/inverterActions";
import { colors1, colors2 } from "../../../../colors/color";

const SmbDetails = () => {
    const dispatch = useDispatch();
    const { plantDetail, error, loading } = useSelector(state => state.plantDetail)
    console.log(plantDetail)
    useEffect(() => {
    }, [dispatch])

    return (
        <div style={{ width: "95%", paddingBottom: "1rem" }}>
            <TableContainer component={Paper}>
                <h1 style={{ textAlign: "center" }}>SMB And String Details</h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#edeaea" }}>
                            <TableCell style={{ fontWeight: "bolder" }}>
                                Array No
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Inverter No
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                SMB No
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Module Wp
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Total String
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Module/String
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Impp of Each String
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Each SMB Current (A)
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>
                                Voltage
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {plantDetail?.data1?.map((value, index, arr) => (
                            <TableRow
                                key={index}

                            // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                {(index === 0 && <TableCell align="left">{value.blockNo}</TableCell>) ||
                                    (index < plantDetail?.length && arr[index].blockNo != arr[index - 1].blockNo && <TableCell align="left">{arr[index].blockNo}</TableCell>) ||
                                    <TableCell align="left">
                                        <p></p>

                                    </TableCell>
                                }

                                {(index === 0 && <TableCell align="center">{value.inverterNo}</TableCell>) ||
                                    (index < plantDetail?.length && arr[index].inverterNo != arr[index - 1].inverterNo && <TableCell align="center">{arr[index].inverterNo}</TableCell>) ||
                                    <TableCell align="center">
                                        <p></p>

                                    </TableCell>
                                }
                                {/* <TableCell align="left">{value.blockNo}</TableCell>
                                <TableCell align="left">{value.inverterNo}</TableCell> */}
                                <TableCell align="center" >{value.smbNo}</TableCell>
                                <TableCell align="center">{value.moduleWP}</TableCell>
                                <TableCell align="center">{value.totalString}</TableCell>
                                <TableCell align="center">{value.modulePerString}</TableCell>
                                <TableCell align="center">{value.imppEachString}</TableCell>
                                <TableCell align="center">{value.smbCurrentEach}</TableCell>
                                <TableCell align="center">{value.voltage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: "50%" }}>
                    {colors1.map((e,index) => {
                        return (
                            <div style={{ height: "30px", width: "100%", background:`${e}` ,textAlign:'center'}}>
                                {index+1}
                            </div>
                        )
                    })}

                </div>
                <div style={{ width: "50%" }}>
                    {colors2.map((e,index) => {
                        return (
                            <div style={{ height: "30px", width: "100%", background: `${e}` ,textAlign:"center"}}>
                                {index+1}
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default SmbDetails;

// blockNo(pin):"Sub-Array-2"
// inverterNo(pin):"INVERTER-01"
// smbNo(pin):"SMB_6"
// moduleWP(pin):330
// totalString(pin):24
// modulePerString(pin):30
// imppEachString(pin):8.99
// smbCurrentEach(pin):215.76
// voltage(pin)
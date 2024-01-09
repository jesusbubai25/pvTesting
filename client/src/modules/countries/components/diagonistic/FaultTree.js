import { Grid } from '@mui/material'
import React, { useState } from 'react'
import './FaultTree.css'
import { dataTree } from '../../../../constants/Data'

const FaultTree = () => {
    const [treeData, setTreeData] = useState(dataTree)
    return (
        <Grid container spacing={2}  minHeight={650}>
            <Grid
                item
                lg={12}
                style={{
                    borderStyle: "solid",
                    borderColor: "#ed7d31",
                    borderRadius: "5px",
                    marginTop: "10px",
                    marginLeft: "16px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    // alignItems:"center",
                    // justifyContent:"center"
                    // flexDirection:"column"
                    flexDirection:"column",
                    paddingTop:"0px"
                }}
            >
            <h1 style={{textAlign:"center",width:"100%"}} >
                 {/* <span style={{margin:"10px 25px 0 0",fontFamily:" Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> */}
                    Fault Tree Diagram
                    {/* </span> */}
                     </h1>

                <div className="tree">
                    {
                        treeRendering(treeData)
                    }
                </div>
                <div>


                </div>

            </Grid>


        </Grid>
    )
}
const treeRendering = (treeData) => {

    return (
        <>
            <ul>
                {
                    treeData.map((item) =>
                        <li className={item.text + item.id}
                        >
                            <div style={{
                                backgroundColor:
                                    `${item.id === 2 || item.id === 5 || item.id === 8 || item.id === 11 || item.id === 14 ? "#ffa907"
                                        : item.id === 1 ? "#fbdb22"
                                            : item.id === 3 ? "#fbd1af"
                                                : "#befafb"}`,
                                // position:item.text==="DC cables"?"relative":"static"
                                // ,
                                padding: item.text === "DC cables" ? "1rem 0.2rem" : "1rem 0.2rem",
                                width:item.id===1 ? "110px":item.id === 2 || item.id === 5 || item.id === 8 || item.id === 11 || item.id === 14 ?"90px"
                                :item.id===3?"80px":"65px"                                
                            }} >{item.text}</div>
                            {
                                item.children && item.children.length &&
                                    treeRendering(item.children)
                                    
                            }
                        </li>
                    )

                }
            </ul>
        </>
    )
}

export default FaultTree
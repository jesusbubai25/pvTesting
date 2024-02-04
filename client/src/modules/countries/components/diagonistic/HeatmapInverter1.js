import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';
import { HeatMapData } from '../../../../actions/inverterActions';
import { useLocation } from 'react-router-dom';
import SpinLoader from '../../../../components/SpinLoader';




const HeatmapInverter1 = () => {

    const { heatmapData, error, loading } = useSelector(state => state.heatmapData)

    const dispatch = useDispatch();
    const location = useLocation();
    const inverter = location.pathname.split("/")[4];

    useEffect(() => {
        dispatch(HeatMapData(inverter[inverter?.length - 1]))
    }, [dispatch])

    console.log(heatmapData?.minValue, heatmapData?.maxValue)
    return (

        <>

            {loading ? <SpinLoader /> :


                <Grid container lg={12} boxSizing={"border-box"}
                    style={{
                        paddingBottom: "1rem"
                    }}
                >


                    <Grid item lg={11.8}
                        borderRadius={"14px"}
                        boxSizing={"border-box"}
                        style={{
                            background: "linear-gradient(to bottom, rgb(3, 99, 125),rgb(4, 128, 162),rgb(4, 135, 172))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1rem",
                            marginLeft: "0.8rem",
                            padding: "1rem"
                        }}>
                        <Grid
                            item
                            lg={11.7}
                            // border={3}
                            // borderColor={"#ed7d31"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            flexDirection={"column"}
                            position={"relative"}
                            bgcolor={"white"}
                            borderRadius={"14px"}
                            paddingTop={"1rem"}

                        >
                            <h3 style={{ padding: "0", margin: "0" }}>HeatMap Analysis For Inverter{inverter[inverter?.length - 1]}</h3>
                            <Chart height={540} width={1300} type='heatmap' options={{
                                plotOptions: {

                                    heatmap: {
                                        distributed: true,
                                        shadeIntensity: 1,
                                        // reverseNegativeShade:false,
                                        // shadeIntensity: 0.5,
                                        // radius: 0,
                                        // useFillColorAsStroke: true,
                                        colorScale: {

                                            ranges: [{
                                                from: -30,
                                                to: -15,
                                                name: 'low',
                                                color: '#00A100',

                                            },
                                            {
                                                from: -14,
                                                to: -12,
                                                name: 'medium',
                                                color: '#128FD9'
                                            },
                                            {
                                                from: -11,
                                                to: -9,
                                                name: 'high',
                                                color: '#FFB200'
                                            },
                                            {
                                                from: -8,
                                                to: -5,
                                                name: 'extreme',
                                                color: '#FF0000'

                                            }
                                            ]
                                        }
                                    }
                                },
                                xaxis: {
                                    labels: {
                                        style: {
                                            fontSize: "1.1rem",
                                            fontWeight: "600",
                                            fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"

                                        }
                                    }
                                },
                                yaxis: {
                                    labels: {
                                        style: {
                                            fontSize: "1.1rem",
                                            // fontWeight:"600",
                                            fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"

                                        }
                                    }
                                },
                                grid: {
                                    show: true,
                                    borderColor: "red",
                                },


                                dataLabels: {
                                    enabled: false,


                                },
                                // stroke: {
                                //     width: 5
                                // },

                                // title: {
                                //     text: 'HeatMap Chart with Color Range'
                                // },
                            }} series={heatmapData?.data || []} />


                        </Grid>
                    </Grid>
                </Grid>
            }
        </>

    )
}

export default HeatmapInverter1



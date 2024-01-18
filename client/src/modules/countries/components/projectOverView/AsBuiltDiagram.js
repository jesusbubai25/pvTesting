import React, { useState } from 'react'
import "./ProjOverView.css";
import { Link } from 'react-router-dom';
import PageURL from '../../../../constants/PageURL';
import DownloadIcon from '@mui/icons-material/Download';
import datasheet from '../../../../fonts and images/data-sheet.png'
import transformer_doc_1 from "../../../../constants/transformer/25 Kva Aux Trafor- WBREDA.pdf"
import transformer_doc_2 from "../../../../constants/transformer/100 KVA Aux Trafo - WBREDA.pdf"
import cabel_doc_1 from "../../../../constants/cables/LUMINO JUPITER SOLAR FOR WBSWDCL (D-GM-0619-123) -TP-GF (R-2)(04.07.2019....xls"
import cabel_doc_2 from "../../../../constants/cables/QAP (WBREDA) -APAR.pdf"
import inverter_doc_1 from "../../../../constants/inverters/2_5mw_solar_inverter_gad.pdf"
import inverter_doc_2 from "../../../../constants/inverters/DelCEN 2500HV_Inverter Cooling Technology.pdf"
import inverter_doc_3 from "../../../../constants/inverters/DelCEN2500 HV Protection features.pdf"
import module_doc_1 from "../../../../constants/modules/5bb 345p marked Annexure-IV.pdf"
import sld_ac_doc_1 from "../../../../constants/SLD/AC SLD/6-19-6098-PV-EE-PL - AC SLD.pdf"

const paths = [
    {
        name: "Modules",
        path: [module_doc_1]
    },
    {
        name: "Inverter",
        path: [inverter_doc_1,
            inverter_doc_2,
            inverter_doc_3
        ]
    },
    {
        name: "Transformer",
        path: [transformer_doc_1, transformer_doc_2]
    },
    {
        name: "Cables",
        path: [cabel_doc_1, cabel_doc_2]
    },
    {
        name: "Sld_Ac",
        path: [sld_ac_doc_1]
    }
    ,
    {
        name: "Sld_Dc",
        path: []
    }

]

const AsBuiltDiagram = () => {
    const [pathData, setPathData] = useState(paths)
    const [path, setPath] = useState(null)
    const [showModule, setShowModule] = useState(false)
    const [showSLD, setShowSLD] = useState(false)

    const [checkedData, setCheckedData] = useState({
        Datasheet: true,
        Cables: false,
        SLD: false,
        String_Configuration: false,
        Warranty: false,
        PVsyst: false,
        OM_Cantact: false
    })
    const selectPathHandler = (name) => {
        let path = pathData?.find(e => e.name === name)
        setPath(path.path)

    }
    console.log(path)

    // const [pdfData, setPdfData] = useState({
    //     Modules: true,
    //     Inverter: false,
    //     Transformer: false,
    //     Dc_sld: false,
    //     Ac_sld: false,
    //     String_Configuration: false,
    //     Warranty: false,
    //     PVsyst: false,
    //     OM_Cantact: false
    // })


    const changeLinkHandler = (name) => {
        console.log(name)
        let newdata = {};
        for (let i in checkedData) {
            if (name === i) newdata[name] = true;
            else newdata[i] = false;
        }
        setCheckedData(newdata)
    }

    const downloadPdf = async (path) => {

        // const pdfUrl = path;
        // const link = document.createElement("a");
        // link.href = pdfUrl;
        // link.download = "document.pdf"; // specify the filename
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);


        await fetch(path).then((response) => {
            response.blob().then((blob) => {

                // Creating new object of PDF file
                const fileURL =
                    window.URL.createObjectURL(blob);

                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;

                let name = path?.split("/")
                name = name[name.length - 1];
                alink.download = name;
                alink.click();
            });
        });
    }
    return (
        <div className='asbuilt_div'>
            <div>
                <span>  GreenEnco</span>
                <span>Creating A Better World In A Changing Climate</span>
            </div>

            <div>
                <div >
                    <span style={{ fontSize: "1.7rem", padding: "1rem 0", borderBottom: "1px solid black", width: "100%", textAlign: "end" }}>Categories</span>
                    <ul >
                        <Link to={PageURL.INDIA_PROJ_OVERVIEW}
                            onClick={() => changeLinkHandler("Datasheet")}
                            style={{ color: checkedData.Datasheet && "red" }} onMouseOver={() => setShowModule(true)} onMouseOut={() => setShowModule(false)} >

                            Datasheet
                            <div className='module_div' style={{
                                width: showModule ? "100%" : "0",
                                padding: showModule ? "0.5rem 0.8rem" : "0",

                            }}
                            >
                                <Link onClick={() => {
                                    selectPathHandler("Modules")
                                }}>Modules</Link>
                                <Link onClick={() => {
                                    selectPathHandler("Inverter")
                                }}
                                >Inverter</Link>
                                <Link onClick={() => {
                                    selectPathHandler("Transformer")
                                }}
                                >Transformer</Link>

                            </div>
                        </Link>
                        <Link onClick={() => {
                            changeLinkHandler("Cables")
                            selectPathHandler("Cables")
                        }
                        }
                            style={{ color: checkedData.Cables && "red" }}

                        >Cables</Link>
                        <Link
                            onClick={() => changeLinkHandler("SLD")}
                            style={{ color: checkedData.SLD && "red" }}
                            onMouseOver={() => setShowSLD(true)} onMouseOut={() => setShowSLD(false)}
                        >
                            SLD
                            <div className='sld_div' style={{
                                width: showSLD ? "100%" : "0",
                                padding: showSLD ? "0.5rem 1.5rem" : "0"

                            }}
                            >
                                <Link
                                    onClick={() => {
                                        selectPathHandler("Sld_Dc")
                                    }}
                                >DC SLD</Link>
                                <Link
                                    onClick={() => {
                                        selectPathHandler("Sld_Ac")
                                    }}

                                >AC SLD</Link>

                            </div>
                        </Link>
                        <Link
                            onClick={() => changeLinkHandler("String_Configuration")}
                            style={{ color: checkedData.String_Configuration && "red" }}
                        >
                            String Configuration</Link>
                        <Link style={{ color: checkedData.Warranty && "red" }}
                            onClick={() => changeLinkHandler("Warranty")}
                        >Warranty</Link>
                        <Link to={""} target='_blank' download style={{ color: checkedData.PVsyst && "red" }}
                            onClick={() => changeLinkHandler("PVsyst")}


                        >PVsyst</Link>
                        <Link style={{ color: checkedData.OM_Cantact && "red" }}
                            onClick={() => changeLinkHandler("OM_Cantact")}


                        >O&M Cantact</Link>

                    </ul>
                </div>
                <div>

                    {path && path?.map((e, i) => {
                        return (
                            <div key={i}>
                                <div>
                                    <div style={{ height: "100%", width: "100%" }}>
                                        <img src={datasheet} alt='Data-Sheet' height={"100%"} width={"100%"} />

                                    </div>

                                    <div onClick={() => downloadPdf(e)}>
                                        <Link style={{ color: "black" }}>Download</Link> In<i className="fa-solid fa-file-pdf"></i>


                                    </div>
                                </div>
                            </div>
                        )
                    })}



                </div>
            </div>


        </div>
    )
}

export default AsBuiltDiagram
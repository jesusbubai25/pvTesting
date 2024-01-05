import React, { useEffect, useRef, useState } from "react";
import CountryHeader from "../CountryHeader";
import "../CountryDefault.css";
import "./ProjOverView.css";
import BasicCard from "../../../../components/CardComponent";
import { Grid } from "@mui/material";
import ProjPic from "../../../../projectOverViewPic.jpg";
import SmallCard from "../../../../components/SmallCard";
import GeneralDetails from "./GeneralDetails";
import InverterDetails from "./InverterDetails";
import SmbDetails from "./SmbDetails";
import { useDispatch, useSelector } from "react-redux";
import { powerPlantDetail } from "../../../../actions/inverterActions";
import SpinLoader from "../../../../components/SpinLoader";
import CountryHeader1 from "../CounterHeader1";
import CountryHeader2 from "../ProjectDetails/CountryHeader2";

const ProjOverView = () => {
  const [showDetails, setShowDetails] = useState({
    showGeneralDetails: false,
    showInverterDetails: false,
    showTechDetails: false,
    showSMB: false,
  });
  const { plantDetail, error, loading } = useSelector(state => state.plantDetail)

  const refReset = useRef(null)
  const refForGeneralDetails = useRef(null);
  const refInverterDetails = useRef(null);
  const refsmb = useRef(null)
  const dispatch = useDispatch();

  useEffect(() => {
    if (showDetails.showGeneralDetails) {
      refForGeneralDetails.current?.scrollIntoView({ behavior: 'smooth' })
    }
    if (showDetails.showInverterDetails) {
      refInverterDetails.current?.scrollIntoView({ behavior: 'smooth' })
    }
    if (showDetails.showSMB) {
      refsmb.current?.scrollIntoView({ behavior: 'smooth' })

    }
    if (!plantDetail) {
      dispatch(powerPlantDetail())
    }
  }, [showDetails, dispatch])


  return (
    // .country-header {
    //   height: 10vh;
    //   width: 100vw;
    //   margin-bottom: 10px;
    // }
    
    // .country-header-no-margin {
    //   height: 10vh;
    //   width: 100vw;
    // }
    
    // .country-body {
    //   width: 100vw;
    //   height: 90vh;
    //   overflow: hidden;
    //   display: flex;
    // }
    <div >
      {/* <div className="country-header-no-margin"> */}
      {/* <CountryHeader /> */}
      {/* <ProjectDetailsHeader /> */}
      {/* <CountryHeader2/> */}
      {/* </div> */}
      {loading ?
        <SpinLoader /> :
        <div ref={refReset} >
          <Grid container spacing={2} >
            <Grid item lg={12} marginBottom={4} >
              <div
                style={{
                  height: "40vh",
                  overflow: "hidden",
                  paddingTop:"5px"
                }}
              >
                <img
                  src={ProjPic}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Project-picture"
                />
              </div>
            </Grid>
            <Grid
              item
              lg={3}
              md={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "40vh",
              }}
            >
              <SmallCard
                heading="General Details"
                body={[
                  `Location: ${plantDetail?.data2.plantName}`,
                  `Capacity DC [MWp]: ${plantDetail?.data2.dcCapacity}`,
                  `Capacity AC [MWp]: ${plantDetail?.data2.acCapacity}`
                ]}
                data={plantDetail?.data2}
                onClick={() => {

                  setShowDetails({
                    ...showDetails,
                    showInverterDetails: false,
                    showSMB: false,
                    showTechDetails: false,
                    showGeneralDetails: !showDetails?.showGeneralDetails,
                  });

                }}

                showExpanded={showDetails?.showGeneralDetails}
              />
            </Grid>
            <Grid
              item
              lg={3}
              md={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SmallCard
                heading="Technical Details"
                body={[
                  `Modules: ${plantDetail?.data2.moduleType}`,
                  `Guaranteed Generation: ${plantDetail?.data2.guaranteedGenereation}`,
                  `Tilt: ${plantDetail?.data2.acCapacity}`
                ]}
                data={plantDetail?.data2}
                onClick={() => {
                  setShowDetails({
                    ...showDetails,
                    showGeneralDetails: false,
                    showInverterDetails: false,
                    showSMB: false,
                    showTechDetails: !showDetails?.showTechDetails,
                  });
                }}
                showExpanded={showDetails?.showTechDetails}
              />
            </Grid>
            <Grid
              item
              lg={3}
              md={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SmallCard
                heading="Inverters"
                body={[
                  `Number of Inverters: ${plantDetail?.data2.numberOfInverter}`,
                  `Specifications: ${plantDetail?.data2.inverterDetails}`,
                  `Inverter Type: ${plantDetail?.data2.inverterType
                  }`
                ]}
                data={plantDetail?.data2}
                onClick={() => {
                  setShowDetails({
                    ...showDetails,
                    showGeneralDetails: false,
                    showSMB: false,
                    showTechDetails: false,
                    showInverterDetails: !showDetails?.showInverterDetails,
                  });
                }}
                showExpanded={showDetails?.showInverterDetails}
              />
            </Grid>
            <Grid
              item
              lg={3}
              md={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SmallCard
                bgColor="#ed7d31"
                heading="SMB & String"
                body={[
                  "Number of SMB: 47",
                  "Number of String: 1106",
                  "String Type: Y Connector",
                  // `Number of SMB: ${plantDetail?.data2.numberOfInverter}`,
                  // `Specifications: ${plantDetail?.data2.inverterDetails}`,
                  // `Inverter Type: ${plantDetail?.data2.inverterType}`
                ]}
                data={plantDetail?.data2}
                onClick={() => {
                  setShowDetails({
                    ...showDetails,
                    showGeneralDetails: false,
                    showInverterDetails: false,
                    showTechDetails: false,
                    showSMB: !showDetails?.showSMB,
                  });
                }}
                showExpanded={showDetails?.showSMB}
              />
            </Grid>
            {showDetails?.showGeneralDetails && (

              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                style={{
                  margin: "auto"
                }}
                ref={refForGeneralDetails}

              >
                <GeneralDetails />
              </Grid>
            )}
            {showDetails?.showInverterDetails &&
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
                ref={refInverterDetails}
              >
                <InverterDetails />
              </Grid>}
            {showDetails?.showSMB &&
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
                ref={refsmb}
              >
                <SmbDetails />
              </Grid>}
          </Grid>
        </div>
      }
    </div>

  );
};

export default ProjOverView;

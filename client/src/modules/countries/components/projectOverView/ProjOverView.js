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

const ProjOverView = () => {
  const [showDetails, setShowDetails] = useState({
    showGeneralDetails: false,
    showInverterDetails: false,
    showTechDetails: false,
    showSMB: false,
  });
  const refReset=useRef(null)
  const refForGeneralDetails = useRef(null);
  const refInverterDetails = useRef(null);

  useEffect(() => {
    if(showDetails.showGeneralDetails){
      refForGeneralDetails.current?.scrollIntoView({behavior: 'smooth'})
    }
    if(showDetails.showInverterDetails){
      refInverterDetails.current?.scrollIntoView({behavior: 'smooth'})
    }

  }, [showDetails])
  

  return (
    <div>
      <div className="country-header-no-margin">
        <CountryHeader />
      </div>
      <div ref={refReset} >
        <Grid container spacing={2} >
          <Grid item lg={12}>
            <div 
              style={{
                height: "40vh",
                overflow: "hidden",
              }}
            >
              <img
                src={ProjPic}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt=""
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
                "Location: Bhajanghat",
                "Capacity DC [MWp]: 10.9",
                "Capacity AC [MWp]: 10.0",
              ]}
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
                "Modules: 330 Wp and 340 Wp",
                "Guaranteed Generation: 15,000,000 kWh",
                "Tilt: Fixed tilt at 19 Degree",
              ]}
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
                "Number of Inverters: 4",
                "Specifications: 2.5 MVA Delta",
                "Inverter Type : Central",
              ]}
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
              ]}
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
              <GeneralDetails  />
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
        </Grid>
      </div>
    </div>
  );
};

export default ProjOverView;

import React from "react";
import { useLocation } from "react-router-dom";
import CountryHeader from "../CountryHeader";
import "../CountryHeader.css";
import PageURL from "../../../../constants/PageURL";
import InverterEfficiency from "./InverterEfficiency";
import SCBSMB from "./SCBSMB";
import LossFlow from "./LossFlow";
import Detailed from "./Detailed";
import Detailed2 from "./Detailed2";
import CountryHeader1 from "../CounterHeader1";
import ProjectDetails from "../ProjectDetails/ProjectDetailBody";
import ProjectDetailsHeader from "../ProjectDetails/ProjectDetailBody";
import CountryHeader2 from "../ProjectDetails/CountryHeader2";
import ProjectDetailBody from "../ProjectDetails/ProjectDetailBody";
import GenOverView from "../generationOverView/GenOverView";
import ProjOverView from "../projectOverView/ProjOverView";
import PresCripModel from "../prescriptiveModel/PresCripModel";
import LossFlow2 from "./LossFlow2";

const Diagonistic = () => {
  const location = useLocation();

  return (
    <div style={{ height: "100%" }} >
      <div className="country-header">
        {/* <ProjectDetails /> */}
        {/* <CountryHeader/> */}
        {/* <ProjectDetailsHeader/> */}
        <CountryHeader2 />
      </div>
      {location?.pathname == PageURL.INDIA_DIAGONISTIC_DETAILED && <Detailed2 />}
      {/* {location?.pathname == PageURL.INDIA_LOSS_FLOW && <LossFlow />} */}
      {location?.pathname == PageURL.INDIA_LOSS_FLOW && <LossFlow2 />}
      {location?.pathname == PageURL.INDIA_INVERTER_EFFICIENCY && <InverterEfficiency />}
      {location?.pathname == PageURL.INDIA_INVERTER1_SCB_SMB1 && <SCBSMB />}
      {location?.pathname == PageURL.INDIA_INVERTER1_SCB_SMB2 && <SCBSMB />}
      {location?.pathname == PageURL.PROJECT_DETAILS && <ProjectDetailBody />}
      {location?.pathname == PageURL.INDIA_GEN_SUMMARY && <GenOverView />}
      {location?.pathname == PageURL.INDIA_PROJ_OVERVIEW && <ProjOverView />}
      {location?.pathname == PageURL.INDIA_PRES_MODEL&& <PresCripModel />}


    </div>
  );
};

export default Diagonistic;

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
import ProjectDetails from "../ProjectDetails/ProjectDetailsHeader";
import ProjectDetailsHeader from "../ProjectDetails/ProjectDetailsHeader";

const Diagonistic = () => {
  const location = useLocation();

  return (
    <div style={{height:"100%"}} >
      <div className="country-header">
        {/* <ProjectDetails /> */}
        {/* <CountryHeader/> */}
        <ProjectDetailsHeader/>
      </div>
      {location?.pathname == PageURL.INDIA_DIAGONISTIC_DETAILED && <Detailed2 />}
      {location?.pathname == PageURL.INDIA_LOSS_FLOW && <LossFlow />}
      {location?.pathname == PageURL.INDIA_INVERTER_EFFICIENCY && <InverterEfficiency />}
      {location?.pathname == PageURL.INDIA_INVERTER1_SCB_SMB1 && <SCBSMB />}
      {location?.pathname == PageURL.INDIA_INVERTER1_SCB_SMB2 && <SCBSMB />}
    </div>
  );
};

export default Diagonistic;

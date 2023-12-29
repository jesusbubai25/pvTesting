import React, { useEffect } from "react";
import CountryGuard from "./guard/CountryGuard";
import CountryDefault from "./components/CountryDefault";
import { useLocation} from "react-router-dom";
import PageURL from "../../constants/PageURL";
import ProjectOverViewGuard from "./guard/ProjectOverViewGuard";
import GenOverViewGuard from "./guard/GenOverViewGuard";
import PrescriptiveGaurd from "./guard/PrescriptiveGaurd";
import GenOverView from "./components/generationOverView/GenOverView";
import ProjOverView from "./components/projectOverView/ProjOverView";
import PresCripModel from "./components/prescriptiveModel/PresCripModel";
import DiagonisticGuard from "./guard/DiagonisticGuard";
import Diagonistic from "./components/diagonistic/Diagonistic";
import ProjectDetails from "./components/ProjectDetails/ProjectDetailsHeader";

const CountryModule = () => {

  const location = useLocation();


  useEffect(() => {

  }, [])



  switch (location.pathname) {
    case PageURL.COUNTRYDEFAULT:
      return (
        <CountryGuard>
          <CountryDefault />
        </CountryGuard>
      );
    case PageURL.INDIA_PROJ_OVERVIEW:
      return (
        <ProjectOverViewGuard>
          <ProjOverView />
        </ProjectOverViewGuard>
      );
    case PageURL.INDIA_GEN_SUMMARY:
      return (
        <GenOverViewGuard>
          <GenOverView />
        </GenOverViewGuard>
      );
    case PageURL.INDIA_PRES_MODEL:
      return (
        <PrescriptiveGaurd>
          <PresCripModel />
        </PrescriptiveGaurd>
      );

    case PageURL.INDIA_DIAGONISTIC_DETAILED:
      return (
        <DiagonisticGuard>
          <Diagonistic />
        </DiagonisticGuard>
      );
    case PageURL.INDIA_LOSS_FLOW:
      return (
        <DiagonisticGuard>
          <Diagonistic />
        </DiagonisticGuard>
      );
    case PageURL.INDIA_INVERTER_EFFICIENCY:
      return (
        <DiagonisticGuard>
          <Diagonistic />
        </DiagonisticGuard>
      );
    case PageURL.INDIA_INVERTER1_SCB_SMB1:
      return (
        <DiagonisticGuard>
          <Diagonistic />
        </DiagonisticGuard>
      );
    case PageURL.INDIA_INVERTER1_SCB_SMB2:
      return (
        <DiagonisticGuard>
          <Diagonistic />
        </DiagonisticGuard>
      );
    case PageURL.PROJECT_DETAILS:
      return (
          <ProjectDetails />
      ) 
  }

};

export default CountryModule;

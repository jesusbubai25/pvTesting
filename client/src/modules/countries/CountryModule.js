import React, { useEffect } from "react";
import CountryGuard from "./guard/CountryGuard";
import CountryDefault from "./components/CountryDefault";
import { useLocation } from "react-router-dom";
import PageURL from "../../constants/PageURL";
import DiagonisticGuard from "./guard/DiagonisticGuard";
import Diagonistic from "./components/diagonistic/Diagonistic";

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
    case PageURL.INDIA_GEN_SUMMARY:
    case PageURL.INDIA_PRES_MODEL_Loss_Flow:
    case PageURL.INDIA_PRES_MODEL_Fault_Tree:
    case PageURL.INDIA_DIAGONISTIC_DETAILED:
    case PageURL.INDIA_LOSS_FLOW:
    case PageURL.INDIA_INVERTER_EFFICIENCY:
    case PageURL.INDIA_INVERTER1_SCB_SMB1:
    case PageURL.INDIA_INVERTER1_SCB_SMB2:
    case PageURL.PROJECT_DETAILS:

      return (
        <DiagonisticGuard>
          <Diagonistic />
        </DiagonisticGuard>

      );
  }

};

export default CountryModule;

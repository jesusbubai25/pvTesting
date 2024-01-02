import React, { useState } from "react";
import "../CountryDefault.css";
import CountryHeader from "../CountryHeader";
import Table from "../../../../components/Table";
import Charts from "../../../../components/Charts";
import LineBarChart from "../../../../components/LineBarChart";
import { Grid } from "@mui/material";
import Printer from "../../../../components/Printer";
import ProjectDetailsHeader from "../ProjectDetails/ProjectDetailBody";
import CountryHeader2 from "../ProjectDetails/CountryHeader2";

const data = [
  {
    name: "Module",
    Loss: 5.25,
  },
  {
    name: "Soiling",
    Loss: 3.5,
  },
  {
    name: "Shadow",
    Loss: 1.3,
  },
  {
    name: "Resistance",
    Loss: 1,
  },
  {
    name: "Overheating",
    Loss: 1,
  },
];

const PresCripModel = () => {
  const [dataSet, setDataSet] = useState(data);
  const [showCheckBox, setShowCheckBox] = useState({
    Module: true,
    Soiling: true,
    Shadow: true,
    Resistance: true,
    Overheating: true,
  });

  const onChangeCheckBox = ({ name }) => {

    try {
      const newData1 = data?.filter((item) => {
        if (item?.name != name) {
          if (showCheckBox[item?.name]) return item;
        } else {
          if (!showCheckBox[item?.name]) return item;
        }
      });

      const checked = { ...showCheckBox };
      checked[name] = !checked[name];
      setShowCheckBox(checked);
      setDataSet(newData1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div className="country-header"> */}
        {/* <ProjectDetailsHeader/> */}
        {/* <CountryHeader /> */}
        {/* <CountryHeader2/> */}
      {/* </div> */}
      <div>
        <Grid
          container
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Grid
            item
            lg={7}
            style={{ borderStyle: "solid", borderColor: "#ed7d31" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "80vh",
              }}
            >
              <Table onChange={onChangeCheckBox} />
            </div>
          </Grid>
          <Grid
            item
            lg={4}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh"
              }}
            >

              {
                dataSet?.length > 0 ?
                  <Charts
                    data={dataSet}
                    width={560}
                    height={500}
                    title="Loss Contribution"
                    xdataKey="name"
                    YAxisLabel="Percentage of Losses"
                  />
                  :
                  <h3>Select an option to view Graph</h3>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PresCripModel;

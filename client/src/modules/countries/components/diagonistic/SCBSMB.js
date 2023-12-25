import React, { useEffect, useState } from "react";
import Charts from "../../../../components/Charts";
import { Grid } from "@mui/material";
import { data1 } from "../../../../constants/Data";
import { data2 } from "../../../../constants/Data";
import { useLocation } from "react-router-dom";
import PageURL from "../../../../constants/PageURL";
import { useDispatch } from "react-redux";
import { All_SCBSMB } from "../../../../actions/inverterActions";

const data = [
  {
    name: "SMB_1.1.1",
    Loss: -14.28,
  },
  {
    name: "SMB_1.1.2",
    Loss: -9.99,
  },
  {
    name: "SMB_1.1.3",
    Loss: -13.31,
  },
  {
    name: "SMB_1.1.4",
    Loss: -9.67,
  },
  {
    name: "SMB_1.1.5",
    Loss: -13.2,
  },
  {
    name: "SMB_1.1.6",
    Loss: -9.98,
  },
  {
    name: "SMB_1.1.7",
    Loss: -12.72,
  },
  {
    name: "SMB_1.1.8",
    Loss: -9.38,
  },
  {
    name: "SMB_1.1.9",
    Loss: -12.16,
  },
  {
    name: "SMB_1.1.10",
    Loss: -9.43,
  },
  {
    name: "SMB_1.1.11",
    Loss: -12.55,
  },
  {
    name: "SMB_1.1.12",
    Loss: -10.43,
  },
];

/* const data1 = [
  {
    name: "Aug 21",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Sep 21",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Oct 21",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Nov 21",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Dec 21",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Jan 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Feb 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Mar 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Apr 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "May 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Jun 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
  {
    name: "Jul 22",
    SMB_1_1_1: -16,
    SMB_1_1_2: -7,
    SMB_1_1_3: -15,
    SMB_1_1_4: -14,
    SMB_1_1_5: -7,
    SMB_1_1_6: -19,
    SMB_1_1_7: -10,
    SMB_1_1_8: -9,
    SMB_1_1_9: -4,
    SMB_1_1_10: -11,
    SMB_1_1_11: -12,
    SMB_1_1_12: -13,
  },
]; */

const SCBSMB = () => {
  const location = useLocation();
  const [dataSet, setDataSet] = useState(
    location?.pathname === PageURL.INDIA_INVERTER1_SCB_SMB1 ? data1 : data2
  );
  const dispatch=useDispatch();

  useEffect(() => {
    // dispatch(All_SCBSMB())

  }, [dispatch])
  
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} style={{ display: "flex", justifyContent: "center" }}>
        <Charts
          data={data}
          width={1450}
          height={500}
          title="SMB Yearly Loss"
          xdataKey="name"
        />
      </Grid>
      <Grid item lg={12} style={{ display: "flex", justifyContent: "center" }}>
        <Charts
          data={dataSet}
          width={1450}
          height={500}
          title="Monthly Average Inverter Efficiency"
          xdataKey="name"
        />
      </Grid>
    </Grid>
  );
};

export default SCBSMB;

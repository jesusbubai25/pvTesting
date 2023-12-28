import React from "react";
import TableMaterial from "../../../../components/TableMaterial";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];

const InverterDetails = () => {


  return (
    <div style={{ width: "95%",paddingBottom:"1rem" }}>
      <TableMaterial data={rows}/>
    </div>
  );
};

export default InverterDetails;

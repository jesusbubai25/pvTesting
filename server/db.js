const mysql = require("mysql2")

// const dbHelper = new db();

class DbChooser {
    constructor() {

        this.db =
        {
            wesa: {
                host: "141.136.43.151",
                user: 'u188495358_pvAPMDB',
                password: '9830pvAPM9831@@',
                database: 'u188495358_pvAPMDB',
                connectionLimit: 10,
                connectTimeout: 30000,
                multipleStatements: true,
                charset: "utf8mb4"
            },
            svn: {
                host: "141.136.43.151",
                user: 'u188495358_pvAPMDB1',
                password: '9830pvAPM9831@@',
                database: 'u188495358_pvAPMDB1',
                connectionLimit: 10,
                connectTimeout: 30000,
                multipleStatements: true,
                charset: "utf8mb4"
            }

        };
    }


}

// const pool = mysql.createPool({
//     host: "141.136.43.151",
//     user: 'u188495358_pvAPMDB',
//     password: '9830pvAPM9831@@',
//     database: 'u188495358_pvAPMDB',
//     waitForConnections: true,
//     multipleStatements: true
// })

// const pool2 = mysql.createPool({
//     host: "141.136.43.151",
//     user: 'u188495358_pvAPMDB1',
//     password: '9830pvAPM9831@@',
//     database: 'u188495358_pvAPMDB1',
//     waitForConnections: true,
//     multipleStatements: true
// })


async function getConnectiontring(req, res, next) {
    let client_id=req.headers.client_id
    console.log(client_id)
    //console.log(req.decoded);
    let d = new DbChooser();
    let con = d.db[client_id];
    req.pool= mysql.createPool(con)
    next();
}

module.exports = getConnectiontring;





// const express = require("express");
// const sql = require("./app");
// const routes=require("./route");
// const application = express();
// const bodyparser = require("body-parser")
// const cors = require("cors");


// sql.application.use(routes)

// sql.app.use(routes)

// const corsOptions = {
//   origin: ["http://localhost:3000"],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// application.use(cors(corsOptions));
// application.use(bodyparser.urlencoded({ extended: true }))
// application.use(express.json())


// Testing Routes
// sql.app.get("/", async (req, res) => {
//   res.send("Hello World!");
// })

// sql.app.get("/test", async (req, res) => {
//   res.json({ message: "Connected server", sucess: true });
// })

// sql.app.get("/hostinger", async (req, res) => {
//   res.send("Hello Hostinger!");
// })



 
// sql.app.get("/login", async (req, res) => {

//   sql.pool.getConnection((err, connection) => {
//     if (err) {
//       connection.release();
//       res.json({ error: err.sqlMessage, sucess: false })
//       throw err
//     }
//     connection.query("select * from Persons", (err, rows) => {
//       connection.release();
//       if (err) {
//         res.json({ error: err.sqlMessage, sucess: false })
//         throw err
//       }
//       else res.json(rows)
//     })
//   })

// });

// //Sign-up Route

// sql.app.post("/sign-up", async (req, res) => {

//   const { firstName, lastName, email, phoneNumber, userLevel } = req.body;
//   pool.getConnection((err, connection) => {
//     if (err) {
//       connection.release();
//       res.json({ error: err.sqlMessage, sucess: false })
//       throw err
//     }
//     connection.query(`INSERT INTO Persons (FirstName, LastName, EmailID, MobileNumber, LevelPermission) VALUES (
//         '${firstName}', '${lastName}', '${email}', ${phoneNumber}, ${userLevel})`, (err, rows) => {
//       connection.release();
//       if (err) {
//         res.json({ error: err.sqlMessage, sucess: false })
//         throw err
//       }
//       else res.json({ sucess: true })
//     })
//   })
// });


// //To get all inverter-efficiency

// sql.app.get("/inverter-efficiency", async (req, res) => {

//   pool.getConnection((err, connection) => {
//     if (err) {
//       connection.release();
//       res.json({ error: err.sqlMessage, sucess: false })
//       throw err
//     }
//     connection.query("SELECT * from inverterEfficiencyDetails", (err, rows) => {
//       connection.release();
//       if (err) {
//         res.json({ error: err.sqlMessage, sucess: false })
//         throw err
//       }
//       else {
//         console.log(rows,rows[0])
//         result = rows[0];
//         let newdata = [];
//         for (let i in result) {
//           let obj = {};
//           obj.name = i;
//           obj.Efficiency = result[i];
//           newdata.push(obj);
//         }
//         res.json(newdata)
//       }
//     })
//   })

// });



// //Get inverter-efficiency-monthly

// sql.app.get("/inverter-efficiency-monthly", async (req, res) => {

//   pool.getConnection((err, connection) => {
//     if (err) {
//       connection.release();
//       res.json({ error: err.sqlMessage, sucess: false })
//       throw err
//     }
//     connection.query("SELECT  * FROM InverterMonthlyEfficiencyDetails", (err, result) => {
//       connection.release();
//       if (err) {
//         res.json({ error: err.sqlMessage, sucess: false })
//         throw err
//       }
//       else{
//         let newresult = [];

//         for (let i = 0; i < result.length; i++) {
//           let obj = {};
//           obj.name = result[i].Month.slice(0, 3) + " " + result[i].Year.toString().slice(2)
//           obj.Inverter1 = result[i].MonthlyInv1Efficiency
//           obj.Inverter2 = result[i].MonthlyInv2Efficiency
//           obj.Inverter3 = result[i].MonthlyInv3Efficiency
//           obj.Inverter4 = result[i].MonthlyInv4Efficiency
//           newresult.push(obj);
//         }

//       res.json(newresult)

//       }
      
//     })
//   })

// });



// //To get normalizedEnergyDetails Data like Net_Energy, contructual_Energy, ExcessORShortfall_kwh, ExcessORShortfall_Percentage, 
// //Normalized_Energy_kwh, AC_Loss In  monthly and yearly

// sql.app.get("/normalizedEnergyDetails", async (req, res) => {

//   pool.getConnection((err, connection) => {
//     if (err) {
//       connection.release();
//       res.json({ error: err.sqlMessage, sucess: false })
//       throw err
//     }else console.log("Connected to Database!")
//     connection.query(`SELECT month_year,Net_Energy,contructual_Energy,ExcessORShortfall_kwh,ExcessORShortfall_Percentage,
//     Normalized_Energy_kwh,AC_Loss from normalizedEnergyDetailsTbl`, (err, result) => {
//       connection.release();
//       if (err) {
//         res.json({ error: err.sqlMessage, sucess: false })
//         throw err
//       }
//       else {
//         let data1 = [], data2 = [];
//         data1.push(
//           {
//             month: "Yearly",
//             net_energy: result.reduce((a, b) => { return a + b.Net_Energy }, 0),
//             contructual_energy: result.reduce((a, b) => { return a + b.contructual_Energy }, 0),
//             ExcessORShortfall_kwh: result.reduce((a, b) => { return a + b.ExcessORShortfall_kwh }, 0),
//             ExcessORShortfall_Percentage: result.reduce((a, b) => { return a + b.ExcessORShortfall_Percentage }, 0),
//             AC_Loss: result.reduce((a, b) => { return a + b.AC_Loss }, 0)
//           }
//         )
//         for (let i = 0; i < result.length; i++) {
//           let obj = {}, obj1 = {};
//           obj.month = result[i].month_year.split("-")[0];
//           obj.net_energy = result[i].Net_Energy
//           obj.contructual_energy = result[i].contructual_Energy
//           obj.ExcessORShortfall_kwh = result[i].ExcessORShortfall_kwh
//           obj.ExcessORShortfall_Percentage = result[i].ExcessORShortfall_Percentage
//           obj.AC_Loss = result[i].AC_Loss
//           data1.push(obj);

//           obj1.name = result[i].month_year.split("-")[0];
//           obj1.normalisedEnergy = result[i].Normalized_Energy_kwh;
//           obj1.netEnergy = result[i].Net_Energy
//           obj1.shortfall = result[i].ExcessORShortfall_Percentage

//           data2.push(obj1);
//         }
//         res.json({ data1, data2 });
//       }
//     })
//   })

// });


//To get GHI-GTI-data like pvsyst_GHI, pvsyst_GTI, Actual_GTI, Actual_GHI in monthly and yearly

// sql.app.get("/GHI-GTI-data", async (req, res) => {


//   pool.getConnection((err, connection) => {
//     if (err) {
//       connection.release();
//       res.json({ error: err.sqlMessage, sucess: false })
//       throw err
//     }
//     connection.query("SELECT month_year,pvsyst_GHI,pvsyst_GTI,Actual_GTI,Actual_GHI from normalizedEnergyDetailsTbl", (err, result) => {
//       connection.release();
//       if (err) {
//         res.json({ error: err.sqlMessage, sucess: false })
//         throw err
//       }
//       else {
//         let data1 = [], data2 = [];
//         for (let i = 0; i < result.length; i++) {
//           let obj = {}, obj1 = {};
//           obj.name = result[i].month_year.split("-")[0].slice(0, 3) + "-" + result[i].month_year.split("-")[1].toString().slice(2);
//           obj1.name = obj.name;
//           obj.pvsyst_GHI = result[i].pvsyst_GHI
//           obj1.pvsyst_GTI = result[i].pvsyst_GTI
//           obj.Actual_GHI = result[i].Actual_GHI
//           obj1.Actual_GTI = result[i].Actual_GTI
//           data1.push(obj); data2.push(obj1)
//         }
//         res.json({ data1, data2 });
//       }
//     })
//   })
// });



// sql.app.get("/net-energy", async (req, res) => {

//   try {

//     const result1 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen1 FROM Inverter1GenerationDataFinal"
//     );
//     const result2 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen2 FROM Inverter2GenerationDataFinal"
//     );
//     const result3 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen3 FROM Inverter3GenerationDataFinal"
//     );
//     const result4 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen4 FROM Inverter4GenerationDataFinal"
//     );
//     const totalGen = result1.concat(result2, result3, result4);
//     res.json(totalGen);

//   } catch (error) {
//     console.log(error)
//     res.json({ error: error.message })

//   }
// });








// sql.app.get("/shortfall", async (req, res) => {

//   try {
//     const totalContract = 80000000;
//     const result1 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen FROM Inverter1GenerationDataFinal"
//     );
//     const result2 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen FROM Inverter2GenerationDataFinal"
//     );
//     const result3 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen FROM Inverter3GenerationDataFinal"
//     );
//     const result4 = await sql.sqlConnection(
//       "SELECT AVG(totalGeneration) AS Gen FROM Inverter4GenerationDataFinal"
//     );
//     const totalGen = result1.concat(result2, result3, result4);
//     const totalEnergy = totalGen?.reduce((a, b) => {
//       return b?.Gen + a;
//     }, 0);
//     res.json({ shortfall: totalContract - totalEnergy });

//   } catch (error) {
//     console.log(error)
//     res.json({ error: "error" })

//   }
// });







// application.get("/SCBSMB1", async (req, res) => {

//   try {
//     const result1 = await sql.sqlConnection(
//       "SELECT  SUM(dcVoltage * dcCurrent)/COUNT(dcVoltage) as Expected   FROM smbLevelDataInverter1"
//     );

//     const result2 = await sql.sqlConnection(
//       "SELECT  SUM(dcPower) /COUNT(dcVoltage) as Actual  FROM smbLevelDataInverter1"
//     );



//     const finalResult = {
//       Expected: result1[0]?.Expected,
//       Actual: result2[0]?.Actual,
//     };

//     res.json(finalResult);

//   } catch (error) {
//     console.log(error);
//     res.json({ error: error.message })

//   }
// });

// application.get("/SCBSMB2", async (req, res) => {

//   try {


//     const result1 = await sql.sqlConnection(
//       "SELECT  SUM(dcVoltage * dcCurrent)/COUNT(dcVoltage) as Expected   FROM smbLevelDataInverter2"
//     );

//     const result2 = await sql.sqlConnection(
//       "SELECT  SUM(dcPower) /COUNT(dcVoltage) as Actual  FROM smbLevelDataInverter2"
//     );

//     const finalResult = {
//       Expected: result1[0]?.Expected,
//       Actual: result2[0]?.Actual,
//     };

//     res.json(finalResult);

//   } catch (error) {
//     console.log(error)
//     res.json({ error: error.message })

//   }
// });



// application.get("/SCBSMB3", async (req, res) => {

//   try {


//     const result1 = await sql.sqlConnection(
//       "SELECT  SUM(dcVoltage * dcCurrent)/COUNT(dcVoltage) as Expected   FROM smbLevelDataInverter3"
//     );

//     const result2 = await sql.sqlConnection(
//       "SELECT  SUM(dcPower) /COUNT(dcVoltage) as Actual  FROM smbLevelDataInverter3"
//     );

//     const finalResult = {
//       Expected: result1[0]?.Expected,
//       Actual: result2[0]?.Actual,
//     };

//     res.json(finalResult);
//   } catch (error) {
//     console.log(error)
//     res.json({ error: error.message })
//   }
// });

// application.get("/SCBSMB4", async (req, res) => {
//   try {


//     const result1 = await sql.sqlConnection(
//       "SELECT  SUM(dcVoltage * dcCurrent)/COUNT(dcVoltage) as Expected   FROM smbLevelDataInverter4"
//     );

//     const result2 = await sql.sqlConnection(
//       "SELECT  SUM(dcPower) /COUNT(dcVoltage) as Actual  FROM smbLevelDataInverter4"
//     );

//     const finalResult = {
//       Expected: result1[0]?.Expected,
//       Actual: result2[0]?.Actual,
//     };

//     res.json(finalResult);
//   } catch (error) {
//     console.log(error)
//     res.json({ error: error.message })

//   }
// });

// process.on("uncaughtException", err => {
//   console.log("Server is closing due to uncaughtException occured!")
//   console.log("Error :", err.sqlMessage)
//   server.close(() => {
//     process.exit(1);
//   })
// })


// const server = application.listen(8000, () => {
//   console.log("Server is running at port " + server.address().port);
// });

// process.on("unhandledRejection", err => {
//   console.log("Server is closing due to unhandledRejection occured!")
//   console.log("Error :", err.sqlMessage)
//   server.close(() => {
//     process.exit(1);
//   })
// })
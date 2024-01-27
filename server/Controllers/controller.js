const mysql = require("mysql2");
const getConnectiontring = require("../db");

const pool = mysql.createPool({
  host: "141.136.43.151",
  user: 'u188495358_pvAPMDB',
  password: '9830pvAPM9831@@',
  database: 'u188495358_pvAPMDB',
  waitForConnections: true,
  multipleStatements: true,
  keepAliveInitialDelay:10000,
  enableKeepAlive:true
})

const pool2 = mysql.createPool({
  host: "141.136.43.151",
  user: 'u188495358_pvAPMDB1',
  password: '9830pvAPM9831@@',
  database: 'u188495358_pvAPMDB1',
  waitForConnections: true,
  multipleStatements: true,
  keepAliveInitialDelay:10000,
  enableKeepAlive:true
})

const promisePool = pool.promise();
const promisePool2 = pool2.promise();


exports.Test2 = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    await connection.beginTransaction();
    const [result, fields] = await connection.query("select * from normalizedEnergyDetailsTbl")
    await connection.commit();
    return res.status(200).json({ result: result, sucess: true });

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message, sucess: false });

  } finally {
    return connection?.release();

  }
  // getConnectiontring(req, res, () => {
  //   const pool = req.pool;
  //   pool.query("select * from testingTbl", (err,result) => {
  //     if (err) {
  //       console.log(err.sqlMessage, " here error ")
  //       return res.json({ error:err.sqlMessage })
  //     } else {
  //       console.log("result ", result)
  //       return res.status(200).json({ result, sucess: true });
  //     }
  //   })
  // })
}

exports.Test3 = async (req, res) => {
  let connection;
  try {
    connection = await promisePool2.getConnection()
    await connection.beginTransaction();
    // const [rows, fields] = await connection.query("select * from registrationGreenEnco;select * from Persons")
    // await connection.commit();
    // return res.status(200).json({ result: { data1: rows[0], data2: rows[1] }, sucess: true });
    // const [rows, fields] = await connection.query("select * from powerPlantDetailsTbl")
    // const [rows, fields] = await connection.query("select * from solarPowerPlantDetails")
    // const [rows, fields] = await connection.query("select * from InverterMonthlyEfficiencyDetails")
    const [rows, fields] = await connection.query("show tableS")
    await connection.commit();
    return res.status(200).json({ result: rows, sucess: true });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    return connection?.release();

  }
}



//To get all inverter-efficiency Handler
exports.InverterEfficiency = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [rows, fields] = await connection.query("SELECT * from inverterEfficiencyDetails")
    await connection.commit();
    let result = rows[0];
    let newdata = [];
    for (let i in result) {
      let obj = {};
      obj.name = i;
      obj.Efficiency = parseFloat(result[i]);
      newdata.push(obj);
    }
    return res.status(200).json({ newdata, sucess: true })
  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    return connection?.release();

  }

};



//Get inverter-efficiency-monthly
exports.InverterEfficiencyMonthly = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [result, fields] = await connection.query("SELECT * from InverterMonthlyEfficiencyDetails")
    await connection.commit();
    let newresult = result?.reduce((acc, curr) => {
      acc.push({
        name: curr.Month.slice(0, 3) + " " + curr.Year.toString().slice(2),
        Inverter1: curr.MonthlyInv1Efficiency,
        Inverter2: curr.MonthlyInv2Efficiency,
        Inverter3: curr.MonthlyInv3Efficiency,
        Inverter4: curr.MonthlyInv4Efficiency,
      })
      return acc;
    }, []);
    return res.status(200).json({ newresult, sucess: true })
  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    return connection?.release();
  }
}



//To get normalizedEnergyDetails Data like Net_Energy, contructual_Energy, ExcessORShortfall_kwh, ExcessORShortfall_Percentage, 
//Normalized_Energy_kwh, AC_Loss In  monthly and yearly

exports.NormalizedEnergyDetails = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [result, fields] = await connection.query(`SELECT month_year,Net_Energy,contructual_Energy,ExcessORShortfall_kwh,ExcessORShortfall_Percentage,
    Normalized_Energy_kwh,AC_Loss,ExcessORShortfallNormalised_Percentage,pvsyst_Energy,T_Cell_Avg_Degree_C,PVsystModuleTempAvg,plantAvailability,
    ((Actual_Inverter_Energy_kwh/(Actual_GTI * 10600)) * 100) as Monthly_PR from normalizedEnergyDetailsTbl;
    `)
    await connection.commit();
    let data1 = [], data2 = [], data3 = [], data4 = [];
    data1.push(
      {
        month: "Yearly",
        net_energy: result.reduce((a, b) => { return a + b.Net_Energy }, 0),
        contractual_energy: result.reduce((a, b) => { return a + b.contructual_Energy }, 0),
        ExcessORShortfall_kwh: result.reduce((a, b) => { return a + b.ExcessORShortfall_kwh }, 0),
        ExcessORShortfall_Percentage: parseFloat(result.reduce((a, b) => { return a + b.ExcessORShortfall_Percentage }, 0) / 12).toFixed(2),
        AC_Loss: parseFloat((Math.floor((result.reduce((a, b) => { return a + b.AC_Loss }, 0) / 12) * 100) / 100).toFixed(2)),
        Actual_pr: parseFloat((Math.floor((result.reduce((a, b) => { return a + b.Monthly_PR }, 0) / 12) * 100) / 100).toFixed(2))
      }
    )
    for (let i = 0; i < result.length; i++) {

      let obj = {}, obj1 = {}, obj2 = {}, obj3 = {};
      obj.month = result[i].month_year.split("-")[0];
      obj.net_energy = result[i].Net_Energy
      obj.contractual_energy = result[i].contructual_Energy
      obj.ExcessORShortfall_kwh = result[i].ExcessORShortfall_kwh
      obj.ExcessORShortfall_Percentage = result[i].ExcessORShortfall_Percentage
      obj.AC_Loss = result[i].AC_Loss
      obj.Actual_pr = parseFloat((Math.floor((result[i].Monthly_PR * 100)) / 100).toFixed(2))
      data1.push(obj);

      obj1.name = result[i].month_year.split("-")[0].slice(0, 3) + "-" + result[i].month_year.split("-")[1].toString().slice(2);
      obj1.contractualEnergy = result[i].contructual_Energy;
      obj1.netEnergy = result[i].Net_Energy
      obj1.shortfall = result[i].ExcessORShortfallNormalised_Percentage
      obj1.normalisedEnergy = result[i].Normalized_Energy_kwh

      data2.push(obj1)

      obj2.name = obj1.name
      obj2.netEnergy = result[i].Net_Energy
      obj2.contractual_energy = result[i].contructual_Energy
      obj2.Actual_pr = parseFloat((Math.floor((result[i].Monthly_PR * 100)) / 100).toFixed(2))
      obj2.ExcessORShortfallNormalised_Percentage = result[i].ExcessORShortfall_Percentage
      obj2.pvsyst_Energy = result[i].pvsyst_Energy

      data3.push(obj2);

      obj3.name = obj1.name;
      obj3.pvsyst_module_temp = result[i]?.PVsystModuleTempAvg
      obj3.actual_module_temp = result[i]?.T_Cell_Avg_Degree_C
      obj3.plant_availability = result[i]?.plantAvailability

      data4.push(obj3)
    }
    return res.status(200).json({ data1, data2, data3, data4, sucess: true });
  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    return connection?.release();
  }
};


//To get GHI-GTI-data like pvsyst_GHI, pvsyst_GTI, Actual_GTI, Actual_GHI in monthly and yearly
exports.GHI_GTI_Data = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [result, fields] = await connection.query(`SELECT month_year,pvsyst_GHI,pvsyst_GTI,Actual_GTI,
    Actual_GHI,pvsyst_GTI_vs_Actual_GTI,pvsyst_GHI_vs_Actual_GHI from normalizedEnergyDetailsTbl
    `)
    await connection.commit();

    let data = result?.reduce((acc, curr) => {
      acc.push({
        name: curr.month_year.split("-")[0].slice(0, 3) + "-" + curr.month_year.split("-")[1].toString().slice(2),
        pvsyst_GHI: curr.pvsyst_GHI,
        pvsyst_GTI: curr.pvsyst_GTI,
        Actual_GHI: curr.Actual_GHI,
        Actual_GTI: curr.Actual_GTI,
        pvsyst_GTI_vs_Actual_GTI: curr.pvsyst_GTI_vs_Actual_GTI,
        pvsyst_GHI_vs_Actual_GHI: curr.pvsyst_GHI_vs_Actual_GHI
      })
      return acc;
    }, []);

    return res.status(200).json({ data, sucess: true });

  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    return connection?.release();
  }
};


exports.powerPlantTableDetails = async (req, res) => {
  let connection, connection2;
  try {
    connection = await promisePool.getConnection()
    connection2 = await promisePool2.getConnection();
    await connection.beginTransaction();
    await connection2.beginTransaction();
    const [rows, fields] = await connection.query("select * from powerPlantDetailsTbl;select * from inverterDetails")
    const [rows2, fields2] = await connection2.query("select * from solarPowerPlantDetails")

    await connection.commit();
    await connection2.commit();
    return res.status(200).json({ result: rows[0], result2: rows2[0], result3: rows[1], sucess: true });
  } catch (error) {
    console.log(error.message);
    await connection.rollback()
    await connection2.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
    connection2?.release();
  }
}

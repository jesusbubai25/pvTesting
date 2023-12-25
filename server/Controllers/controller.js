const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "141.136.43.151",
  user: 'u188495358_pvAPMDB',
  password: '9830pvAPM9831@@',
  database: 'u188495358_pvAPMDB',
  waitForConnections: true,
  multipleStatements: true
})

const promisePool = pool.promise();


exports.Test3 = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    await connection.beginTransaction();
    const [rows, fields] = await connection.query("select * from registrationGreenEnco;select * from Persons")
    await connection.commit();
    return res.status(200).json({ result: { data1: rows[0], data2: rows[1] }, sucess: true });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
  }
}



//To get all inverter-efficiency Handler
exports.InverterEfficiency = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [rows, fields] = await connection.query("SELECT * from inverterEfficiencyDetails")
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
    connection?.release();
  }

};



//Get inverter-efficiency-monthly
exports.InverterEfficiencyMonthly = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [result, fields] = await connection.query("SELECT * from InverterMonthlyEfficiencyDetails")
    let newresult = [];
    for (let i = 0; i < result.length; i++) {
      let obj = {};
      obj.name = result[i].Month.slice(0, 3) + " " + result[i].Year.toString().slice(2)
      obj.Inverter1 = result[i].MonthlyInv1Efficiency
      obj.Inverter2 = result[i].MonthlyInv2Efficiency
      obj.Inverter3 = result[i].MonthlyInv3Efficiency
      obj.Inverter4 = result[i].MonthlyInv4Efficiency
      newresult.push(obj);
    }

    return res.status(200).json({ newresult, sucess: true })
  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
  }
}



//To get normalizedEnergyDetails Data like Net_Energy, contructual_Energy, ExcessORShortfall_kwh, ExcessORShortfall_Percentage, 
//Normalized_Energy_kwh, AC_Loss In  monthly and yearly

exports.NormalizedEnergyDetails = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    const [result, fields] = await connection.query(`SELECT month_year,Net_Energy,contructual_Energy,ExcessORShortfall_kwh,ExcessORShortfall_Percentage,
    Normalized_Energy_kwh,AC_Loss from normalizedEnergyDetailsTbl;
    select ((Actual_Inverter_Energy_kwh/(Actual_GTI * 10600)) * 100) as Monthly_PR from normalizedEnergyDetailsTbl
    `)
    let data1 = [], data2 = [];
    data1.push(
      {
        month: "Yearly",
        net_energy: result[0].reduce((a, b) => { return a + b.Net_Energy }, 0),
        contructual_energy: result[0].reduce((a, b) => { return a + b.contructual_Energy }, 0),
        ExcessORShortfall_kwh: result[0].reduce((a, b) => { return a + b.ExcessORShortfall_kwh }, 0),
        ExcessORShortfall_Percentage: result[0].reduce((a, b) => { return a + b.ExcessORShortfall_Percentage }, 0),
        AC_Loss: parseFloat((Math.floor((result[0].reduce((a, b) => { return a + b.AC_Loss }, 0)) * 100) / 100).toFixed(2)),
        Acutal_pr: parseFloat((Math.floor((result[1].reduce((a, b) => { return a + b.Monthly_PR }, 0)) * 100) / 100).toFixed(2))
      }
    )
    for (let i = 0; i < result[0].length; i++) {
      let obj = {}, obj1 = {};
      obj.month = result[0][i].month_year.split("-")[0];
      obj.net_energy = result[0][i].Net_Energy
      obj.contructual_energy = result[0][i].contructual_Energy
      obj.ExcessORShortfall_kwh = result[0][i].ExcessORShortfall_kwh
      obj.ExcessORShortfall_Percentage = result[0][i].ExcessORShortfall_Percentage
      obj.AC_Loss = result[0][i].AC_Loss
      obj.Acutal_pr = parseFloat((Math.floor((result[1][i].Monthly_PR * 100)) / 100).toFixed(2))

      data1.push(obj);

      obj1.name = result[0][i].month_year.split("-")[0];
      obj1.normalisedEnergy = result[0][i].Normalized_Energy_kwh;
      obj1.netEnergy = result[0][i].Net_Energy
      obj1.shortfall = result[0][i].ExcessORShortfall_Percentage

      data2.push(obj1);
    }
    return res.status(200).json({ data1, data2, sucess: true });
  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
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
    // let pvsyst_actual_GHI = [], pvsyst_actual_GTI = [];
    // let data=[];
    // for (let i = 0; i < result?.length; i++) {
    //   let obj = {}, obj1 = {};
    //   obj.name = result[i].month_year.split("-")[0].slice(0, 3) + "-" + result[i].month_year.split("-")[1].toString().slice(2);
    //   // obj1.name = obj.name;
    //   obj.pvsyst_GHI = result[i].pvsyst_GHI
    //   obj.pvsyst_GTI = result[i].pvsyst_GTI
    //   obj.Actual_GHI = result[i].Actual_GHI
    //   obj.Actual_GTI = result[i].Actual_GTI
    //   obj.pvsyst_GTI_vs_Actual_GTI=result[i].pvsyst_GTI_vs_Actual_GTI
    //   obj.pvsyst_GHI_vs_Actual_GHI=result[i].pvsyst_GHI_vs_Actual_GHI
    //   // pvsyst_actual_GHI.push(obj); pvsyst_actual_GTI.push(obj1)
    //   data.push(obj);
    // }
    // return res.status(200).json({ data, sucess: true });



    let data1 = [], data2 = [], data3 = [];
    for (let i = 0; i < result?.length; i++) {
      let obj = {}, obj1 = {}, obj2 = {};
      obj.name = result[i].month_year.split("-")[0].slice(0, 3) + "-" + result[i].month_year.split("-")[1].toString().slice(2);
      obj1.name = obj.name;
      obj2.name = obj.name;
      obj2.pvsyst_GTI_vs_Actual_GTI = result[i].pvsyst_GTI_vs_Actual_GTI
      obj2.pvsyst_GHI_vs_Actual_GHI = result[i].pvsyst_GHI_vs_Actual_GHI
      obj.pvsyst_GHI = result[i].pvsyst_GHI
      obj1.pvsyst_GTI = result[i].pvsyst_GTI
      obj.Actual_GHI = result[i].Actual_GHI
      obj1.Actual_GTI = result[i].Actual_GTI

      // pvsyst_actual_GHI.push(obj); pvsyst_actual_GTI.push(obj1)
      data1.push(obj); data2.push(obj1),data3.push(obj2);
    }
    return res.status(200).json({ data1,data2,data3, sucess: true });

  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(400).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
  }
};

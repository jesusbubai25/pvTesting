const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "141.136.43.151",
    user: 'u188495358_pvAPMDB',
    password: '9830pvAPM9831@@',
    database: 'u188495358_pvAPMDB',
    waitForConnections: true,
    multipleStatements: true
})

const pool2 = mysql.createPool({
    host: "141.136.43.151",
    user: 'u188495358_pvAPMDB1',
    password: '9830pvAPM9831@@',
    database: 'u188495358_pvAPMDB1',
    waitForConnections: true,
    multipleStatements: true
})

const promisePool = pool.promise();
const promisePool2 = pool2.promise();


exports.Inverter_Smb_Yearly_Loss = async (req, res) => {
    let connection;
    try {
        connection = await promisePool2.getConnection()
        await connection.beginTransaction();
        const [result, fields] = await connection.query("select * from smbYearlyDataForInverters")
        await connection.commit();
        return res.status(200).json({ result, sucess: true });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message, sucess: false });

    } finally {
        connection?.release();
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


exports.Inverter_Smb_Monthly_Loss = async (req, res) => {
    let connection;
    try {
        const { inverter } = req.params
        connection = await promisePool2.getConnection()
        await connection.beginTransaction();
        if (inverter == 1) {
            const [result, fields] = await connection.query("select * from smb1_11MonthlyDataForInverter1")
            await connection.commit();
            return res.status(200).json({ result, sucess: true });

        } else if (inverter == 2) {
            const [result, fields] = await connection.query("select * from smb2_12MonthlyDataForInverter2")
            await connection.commit();
            return res.status(200).json({ result, sucess: true });

        } else if (inverter == 3) {
            const [result, fields] = await connection.query("select * from smb3_12MonthlyDataForInverter3")
            await connection.commit();
            return res.status(200).json({ result, sucess: true });

        } else if (inverter == 4) {
            const [result, fields] = await connection.query("select * from smb4_12MonthlyDataForInverter4")
            await connection.commit();
            return res.status(200).json({ result, sucess: true });

        } else return res.status(200).json({ result: [], sucess: true })


    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message, sucess: false });

    } finally {
        connection?.release();
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
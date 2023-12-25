const token = "greencousers"
const jwt = require("jsonwebtoken")
const mysql = require('mysql2')



const pool = mysql.createPool({
    host: "141.136.43.151",
    user: 'u188495358_pvAPMDB',
    password: '9830pvAPM9831@@',
    database: 'u188495358_pvAPMDB',
    waitForConnections: true,
    multipleStatements: true
})

const promisePool = pool.promise();

exports.isAuth = async (req, res, next) => {
    const { auth_token } = req.cookies;
    if (!auth_token) {
        return res.status(401).json({ error: "Please login to access the details", sucess: false })
    }
    const payload = jwt.verify(auth_token, token);
    req.email_ID = payload.id
    next();
}

exports.isAdmin = async (req, res, next) => {
    let connection = await promisePool.getConnection()
    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID=?`, [req.email_ID])
    if (rows[0].LevelPermission != 4) {
        return res.status(200).json({ error: "This feature is only allowed for admin users" })
    }
    next();
}
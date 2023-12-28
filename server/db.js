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
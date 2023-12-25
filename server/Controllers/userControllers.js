const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail");
const { generateStrongPassword, getOtp } = require("../utils/strongPassword");
const mysql = require('mysql2')
const token = "greencousers"
const OTP_obj = { otp: null, date: null, email: null }

const pool = mysql.createPool({
  host: "141.136.43.151",
  user: 'u188495358_pvAPMDB',
  password: '9830pvAPM9831@@',
  database: 'u188495358_pvAPMDB',
  waitForConnections: true,
  multipleStatements: true
})

const promisePool = pool.promise();

// Sign-up Handler
exports.SignupHandler = async (req, res) => {
  let connection;
  try {
    const { firstName, lastName, email, phoneNumber, userLevel } = req.body;
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return res.status(400).json({ error: errors.array()[0].msg, sucess: false })
    }
    connection = await promisePool.getConnection()
    await connection.beginTransaction();

    const [rows, fields] = await connection.query(`select * from Persons where emailID='${email}';
    select * from registrationGreenEnco where email_ID='${email}'`)

    if (rows[0].length > 0 || rows[1].length > 0) {
      return res.status(400).json({ error: "User in this email alredy exist", sucess: false })
    }
    await connection.query(`INSERT INTO Persons (FirstName, LastName, EmailID, MobileNumber, LevelPermission) VALUES (
    '${firstName}', '${lastName}', '${email}', ${phoneNumber}, ${userLevel})`)
    const options = {
      email: email,
      message: "You will get a response from our team shortely",
      subject: "Test"
    }
    await sendEmail(options)
    await connection.commit();

    return res.json({ error: "user registred successfully!", sucess: true })

  } catch (error) {
    console.log(error.message);
    await connection.rollback()
    return res.status(200).json({ error: error.message, sucess: false });

  } finally {
    connection?.release();
  }
}


// Allow Registered Users Handler (Admin)
exports.allowRegistredUser = async (req, res) => {
  let connection;
  try {
    const { email_ID } = req.body;
    connection = await promisePool.getConnection()
    await connection.beginTransaction();

    const [rows, fields] = await connection.query(`select * from Persons where emailID=?`, [email_ID])

    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" })
    }
    let strong_password = generateStrongPassword()
    let hash_password = await bcryptjs.hash(strong_password, 10);
    await connection.query(`INSERT INTO registrationGreenEnco (FirstName, LastName, Country, Region, PhoneNumber, email_ID, userName, userPassword, LevelPermission) VALUES (
    ?,?,?,?,?,?,?,?,?)`, [rows[0].FirstName, rows[0].LastName, "India", "West bengal,Kolkata",
    rows[0].MobileNumber, rows[0].EmailID, rows[0].EmailID, hash_password, rows[0].LevelPermission])

    await connection.query(`DELETE FROM Persons WHERE EmailId LIKE ?`, [email_ID])
    const options = {
      email: email_ID,
      subject: "Regarding your Greenenco-Pvamp-Dashboard password",
      message: `Please follow the below credentials to login our portals
          username : use your emailId as username
          password : ${strong_password}
          `
    }
    await sendEmail(options)
    await connection.commit();
    return res.json({ error: "email regarding login sent to the user Successfully!", sucess: true })

  } catch (error) {
    console.log(error.message);
    await connection?.rollback()
    return res.status(200).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
  }
}



//  Login Handler
exports.LoginHandler = async (req, res) => {
  let connection;
  try {
    const { userName, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg)
      return res.status(400).json({ error: errors.array()[0].msg, sucess: false })
    }

    connection = await promisePool.getConnection()
    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID=?`, [userName])

    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" })
    }

    const isPassword = await bcryptjs.compare(password, rows[0].userPassword)
    if (!isPassword) {
      return res.status(400).json({ error: "Enter valid password for the username", sucess: false })
    }
    const jwt_token = jwt.sign({ id: userName }, token, { expiresIn: "1d" })
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    return res.status(200).cookie("auth_token", jwt_token, options).json({ user: rows[0], sucess: true });

  } catch (error) {
    console.log(error.message);
    await connection?.rollback()
    return res.status(200).json({ error: error.message, sucess: false });
  }
  finally {
    connection?.release();
  }
}


// Delete a existing user (Admin)
exports.deleteExistingUser = async (req, res) => {
  let connection;
  try {
    let email = req.params.email_ID;
    connection = await promisePool.getConnection()
    await connection.beginTransaction();

    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID='${email}'`)
    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found", sucess: false })
    }

    await connection.query(`DELETE FROM registrationGreenEnco WHERE email_ID LIKE '${email}'`)
    const options = {
      email: email,
      message: "Your account deleted",
      subject: "Test"
    }
    await sendEmail(options)
    await connection.commit();
    return res.json({ error: `user ${email} deleted successfully!`, sucess: true })

  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(200).json({ error: error.message, sucess: false });

  } finally {
    connection?.release();
  }
}


// send otp to mail handler
exports.sendOtpHandler = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection()
    await connection.beginTransaction();

    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID=?`, [req.body.email_ID])
    if (rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ error: "user not fond", sucess: false })
    }

    let otp = getOtp(4)
    const options = {
      email: req.body.email_ID,
      message: `Your One Time Password is ${otp}`,
      subject: "Regarding your forgot password"
    }
    await sendEmail(options)
    const options2 = {
      expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true
    }
    await connection.commit();
    return res.status(200).cookie("auth_otp", otp, options2).json({ error: `otp sent to the user successfully  OTP is ${otp}`, sucess: true })

  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(200).json({ error: error.message, sucess: false });
  } finally {
    connection?.release();
  }
}

// verify otp handler
exports.verifyOtpHandler = async (req, res) => {
  let strong_password, hash_password, connection;
  try {
    const { auth_otp } = req.cookies
    const { email_ID, otp } = req.body
    connection = await promisePool.getConnection();
    if (!auth_otp) {
      return res.status(400).json({ error: "otp has expired! please resend otp", sucess: false })
    }
    else if (auth_otp != otp) {
      return res.status(400).json({ error: "OTP is incorrect", sucess: false })
    }
    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID=?`, [email_ID])
    if (rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ error: "user not fond", sucess: false })
    }
    strong_password = generateStrongPassword()
    hash_password = await bcryptjs.hash(strong_password, 10);
    await connection.query(`update registrationGreenEnco set userPassword=? where email_ID = ?`, [hash_password, email_ID])

    const options = {
      email: email_ID,
      subject: "Regarding your Greenenco-Pvamp-Dashboard password",
      message: `Please follow the below credentials to login our portals
      username : use your emailId as username
      password : ${strong_password}
      `
    }
    await sendEmail(options)
    await connection.commit();
    return res.status(200).cookie("auth_otp", null, { expires: new Date(Date.now()), httpOnly: true }).json({ message: "Otp verified sucessfully! and password sent to your email", sucess: true })

  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(200).json({ error: error.message, sucess: false });
  } finally {
    connection?.release();
  }
}


// re-send otp to mail handler
exports.reSendOtpHandler = async (req, res) => {
  let connection;
  try {
    const email = req.body.email_ID;
    connection = await promisePool.getConnection()
    await connection.beginTransaction();

    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID=?`, [email])
    if (rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ error: "user not fond", sucess: false })
    }
    let otp = getOtp(4)
    const options = {
      email: email,
      message: `Your One Time Password is ${otp}`,
      subject: "Regarding your forgot password"
    }
    await sendEmail(options)

    const options2 = {
      expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true
    }
    return res.status(200).cookie("auth_otp", otp, options2).json({ error: `otp sent to the user successfully  OTP is ${otp}`, sucess: true })

  } catch (error) {
    console.log(error.message);
    await connection?.rollback();
    return res.status(200).json({ error: error.message, sucess: false });
  }finally{
    connection?.release();
  }
}

// Logout Handler
exports.LogoutHandler = async (req, res) => {
  try {
    res.status(200).cookie("auth_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    }).json({
      sucess: true,
      message: "Logged out succefully"
    })
  } catch (error) {
    return res.status(200).json({ error: error.message, sucess: false })
  }
}


//getuser Handler
exports.getUser = async (req, res) => {
  let connection;
  try {
    const email_ID = req.email_ID;
    connection = await promisePool.getConnection();
    const [rows, fields] = await connection.query(`select * from registrationGreenEnco where email_ID=?`, [email_ID])
    if (rows.length === 0) {
      return res.status(401).json({ error: "User not found", sucess: false })
    }
    return res.status(200).json({ user: rows[0], sucess: true });
  } catch (error) {

    await connection?.rollback();
    console.log(error.message);
    return res.status(200).json({ error: error.message, sucess: false });
  } finally {
    connection?.release();
  }
}


// Get Registered Users (Admin)
exports.getRegisteredUsers = async (req, res) => {
  let connection;
  try {
    connection = await promisePool.getConnection();
    const [rows, fields] = await connection.query("select * from Persons")
    return res.status(200).json({ users: rows, sucess: true });

  } catch (error) {
    await connection?.rollback();
    console.log(error.message);
    return res.status(200).json({ error: error.message, sucess: false });
  } finally {
    connection?.release();
  }

}


// Delete Registred User (Admin)
exports.deleteRegistredUser = async (req, res) => {
  let connection;
  try {
    const { email_ID } = req.params;
    connection = await promisePool.getConnection();
    await connection.beginTransaction();
    const [rows, fields] = await connection.query(`select * from Persons where EmailID=?`, [email_ID])
    if (rows.length === 0) {
      console.log("user not found")
      return res.status(401).json({ error: "User not found" })
    }

    await connection.query(`DELETE FROM Persons WHERE EmailId LIKE ?`, [email_ID])
    const options = {
      email: email_ID,
      subject: "Regarding your Greenenco-Pvamp-Dashboard registration",
      message: "You are not allowed to access our dashboard"
    }
    await sendEmail(options)
    connection.commit();
    return res.json({ error: "user deleted Successfully and an mail reagarding this sent to the user", sucess: true })
  } catch (error) {
    await connection?.rollback();
    console.log(error.message);
    return res.status(200).json({ error: error.message, sucess: false });
  } finally {
    connection?.release();
  }
}


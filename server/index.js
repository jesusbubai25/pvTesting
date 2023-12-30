const express=require("express")
const application = express();
const bodyparser = require("body-parser")
const cors = require("cors");
const handleRoutes=require("./route")
const cookieparser=require("cookie-parser")
require('dotenv').config({path:"./config.env"})
const bcryptjs=require("bcryptjs");


// const corsOptions = {
//   origin: ["http://localhost:3000","http://localhost:8000"],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// application.use(cors(corsOptions))
application.use(cors());
application.use(bodyparser.urlencoded({ extended: true }))
application.use(express.json())
application.use(cookieparser())
application.use(handleRoutes)

application.get("/getData",async(req,res)=>{
  return res.status(200).json({data:{name:"sidhant",age:22},sucess:true})
})


process.on("uncaughtException", err => {
  console.log("Server is closing due to uncaughtException occured!")
  console.log("Error :", err.message)
  server.close(() => {
    process.exit(1);
  })
})

const server = application.listen(8443, () => {
  console.log("Server is running at port " + server.address().port);
});


process.on("unhandledRejection", err => {
  console.log("Server is closing due to unhandledRejection occured!")
  console.log("Error is:", err.message)
  server.close(() => {
    process.exit(1);
  })
})






const router = require("express").Router();
const { InverterEfficiency,
    InverterEfficiencyMonthly, NormalizedEnergyDetails, GHI_GTI_Data, Test3
} = require("./Controllers/controller");

const { LoginHandler, SignupHandler, getRegisteredUsers,
    getUser, allowRegistredUser, LogoutHandler, deleteRegistredUser, verifyOtpHandler, sendOtpHandler, reSendOtpHandler, deleteExistingUser } = require("./Controllers/userControllers");
const { isAuth, isAdmin } = require("./utils/isAuth");
const { userRegistrationValidation, userLoginValidation } = require("./utils/user.validation");



router.route("/test3").get(Test3)
router.route("/login").post(userLoginValidation, LoginHandler)
router.route("/logout").get(isAuth, LogoutHandler)
router.route("/sign-up").post(userRegistrationValidation, SignupHandler)
router.route("/send-otp").post( sendOtpHandler)
router.route("/resend-otp").post( reSendOtpHandler)
router.route("/verify-otp").post( verifyOtpHandler)
router.route("/getuser").get(isAuth,getUser)


// Admin Routes 
router.route("/admin/delete-existing-user/:email_ID").delete(isAuth,isAdmin,deleteExistingUser)
router.route("/admin/allow-user").post(isAuth,isAdmin,allowRegistredUser)
router.route("/admin/delete-user/:email_ID").delete(isAuth,isAdmin,deleteRegistredUser)
router.route("/admin/registered-users").get(isAuth,isAdmin,getRegisteredUsers)




router.route("/inverter-efficiency").get(isAuth,InverterEfficiency)
router.route("/inverter-efficiency-monthly").get(isAuth,InverterEfficiencyMonthly)
router.route("/normalizedEnergyDetails").get(isAuth, NormalizedEnergyDetails)
router.route("/GHI-GTI-data").get(isAuth,GHI_GTI_Data)

module.exports = router;
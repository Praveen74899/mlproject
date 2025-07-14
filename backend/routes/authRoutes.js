const express = require("express");
const router = express.Router();
const { 
    signup,
    login,
    getUserDetails,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController");

router.post("signup", signup);
router.post("/login",login);
router.get("/user",getUserDetails);
router.post("/forget-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);

module.exports = router;
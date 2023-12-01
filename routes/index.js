const express = require('express')
const router = express.Router();
const {signup, verifyOtp, resendOtp, forgetPassword, forgetPasswordOtp, login, getStudentProfile, request, startRequestPayment, completeRequestPayment} = require('../controllers');
const { authorization } = require('../middleware');

router.post("/signup", signup);
router.patch("/verify/:email", verifyOtp);
router.get("/resend-otp/:email", resendOtp);
router.get("/reset-password-otp/:email", forgetPasswordOtp);
router.post("/reset-password/:email/:otp_", forgetPassword);
router.post("/auth/login", login);
router.get("/student-profile",authorization, getStudentProfile);
router.post("/request", authorization, request);
router.post("/initialise-payment", authorization, startRequestPayment );
router.post("/complete-payment", authorization, completeRequestPayment);

module.exports = router

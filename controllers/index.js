require('dotenv').config();
const models = require('../models');
const { Op } = require('sequelize');
const {studentSignupValidation, loginValidation} = require('../validations');
const {hashPassword, otpGenerator, comparePassword} = require('../utils/helpers.js');
const {v4 : uuidv4} = require('uuid');
const {otpType, requestStatus, paymentStatus} = require('../constant/enum')
const jwt = require('jsonwebtoken');
const { startPayment, completePayment } = require('../services');




const signup = async (req,res) =>{
  const {surname, othernames, gender, email, password, image_url, repeat_password, phone, dob, faculty, department, school} = req.body;

  try{
    const {error} = studentSignupValidation(req.body)

    // if(Date.now() - new Date(dob) < 16) throw new Error(" You are not eligible")

    if(error !== undefined) throw new Error(error.details[0].message);

    const checkIfStudentExits = await models.Student.findOne({
      where:{
        email: email
      }
    });
    
    if(checkIfStudentExits) throw new Error("Student already exits, try login...");

    const { salt, hash} = await hashPassword(password);
    
    const otp_ = otpGenerator();

    const createOtp = {
      otp_id: uuidv4(),
      otp: otp_,
      email,
      otp_type: otpType.Registration
    };
    
    await models.Otp.create(createOtp);

    const createStudent = await models.Student.create({
      student_id: uuidv4(),
      surname,
      othernames,
      matric_no: Date.now(),
      gender,
      email : email.toLowerCase(),
      image_url,
      password_hash : hash,
      password_salt : salt, 
      phone, 
      dob, 
      faculty, 
      department, 
      school

    });

    res.status(201).json({
      status: true,
      message: "Signed up sucessfully.",
      data: createStudent
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message || "Server Error"
    });
  };
};

const verifyOtp = async (req, res) =>{
  const {email} = req.params;
  const {otp} = req.body;

  
  try{

    const checkOtp = await models.Otp.findOne({
      where:{
        email,
        otp,
        otp_type: otpType.Registration
      }
    })

    if(!checkOtp) throw new Error('Otp is not correct');

    await models.Student.update({
      is_otp_verified: true,
    },{
      where: {
        email
      }
    })


    

    await models.Otp.destroy({
      where:{
        email,
        otp,
        otp_type: otpType.Registration
      }
    })

    res.status(200).json({
      status: true,
      message: "Account verified successfully."
    });

  }catch(err){
    console.log(err)
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

const resendOtp = async (req,res)=>{
  const {email} = req.params;

  if(!email) throw new Error('Bad Request');

  try{

    const checkEmail = await models.Student.findOne({
      where:{
        email
      }
    });

    if(!checkEmail) throw new Error('Can\'t find email');

    const otp_ = otpGenerator()

    const resendOtp = {
      otp_id: uuidv4(),
      otp: otp_,
      email,
      otp_type: otpType.Registration
    };

    await models.Otp.create(resendOtp)

    res.status(201).json({
      status: true,
      message: "Otp sent Successfully."
    });

  }catch(err){
    res.status(500).json({
      status: false,
      message: err.message
    });
  };
};

const forgetPasswordOtp = async (req, res)=>{
   const {email} = req.params;

   try{
    if(!email) throw new Error('Fields Required');

    const checkEmail = await models.Student.findOne({
      where:{
        email
      }
    });

    if(!checkEmail) throw new Error('You are not reconginised');

    

    const otp_ = otpGenerator()
    const createOtp = {
      otp_id: uuidv4(),
      otp: otp_,
      email,
      otp_type: otpType.Reset_Password
    };

    await models.Otp.create(createOtp)

    // Send an otp to the email

    
    res.status(200).json({
      status: true,
      message: "An Otp to reset your password has been sent to your email"
    });

   }catch(err){
    res.status(500).json({
      status: false,
      message: err.message
    })
   }
};

const forgetPassword = async (req,res)=>{

  const { otp_, email} = req.params;
  const {password} = req.body;

  try{

    // if(!otp_ || !password) throw new Error('Field must be filled');
    const checkOtp = await models.Otp.findOne({
      where:{
        otp: otp_,
        email,
        otp_type: otpType.Reset_Password
      }
    });

    if(!checkOtp) throw new Error('Something went wrong, try again.');

    const { salt, hash} = await hashPassword(password);

    await models.Student.update({
      password_hash: hash,
      password_salt: salt
    },{
      where: { 
        email
      }
    });

    await models.Otp.destroy({
      where:{
        otp: otp_,
        otp_type: otpType.Reset_Password
      }
    });

    res.status(200).json({
      status: true,
      message: "Password reset successfully.."
    })

  }catch(err){
    console.log(err)
    res.status(500).json({
      status: false,
      message: err.message || " Server Error"
    });
  }
};

const login = async(req, res)=>{
  const {email, password} = req.body;

  try{
    const {error} = loginValidation(req.body);

    if(error !== undefined) throw new Error(error.details[0].message);

    const checkEmail = await models.Student.findOne({
      where:{
        email
      }
    });

    // console.log(checkEmail)
    // console.log("Here ", Date.now())

    if(!checkEmail) throw new Error('Email or Password is not correct');

    const dataPayload = {
      id: uuidv4(),
      email: checkEmail.email.toLowerCase(),
    };


    
    const comparePasswordHash = await comparePassword(password, checkEmail.password_hash);
    // console.log("here  " ,comparePasswordHash)

    if(!comparePasswordHash) throw new Error('Invalid Email or Password');

    const token = jwt.sign(dataPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    
    const studentInfo = checkEmail

    // console.log("student ",studentInfo)
    
    res.status(200).json({
      status: true,
      message: "Logged in successfully",
      token,
      data:{
        student_id: checkEmail.student_id,
        matric_no: checkEmail.matric_no,
        email: checkEmail.email.toLowerCase(),
      }
    });

  }catch(err){
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message || "Server Error"
    })

  };
};

const getStudentProfile = async(req,res)=>{
  const {email} = req.params;

  try{
    if(!email) throw new Error("Something went wrong...")

    const getStudent = await models.Student.findOne({
      where:{
        email
      }
    });

    if(!getStudent) throw new Error('Can\'t get student');

    delete getStudent.dataValues.password_hash;
    delete getStudent.dataValues.password_salt;

    res.status(200).json({
      status: true,
      message:"Successfully fetched the student profile",
      data: getStudent
    });


  }catch(err){
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message || "Serve Error"
    });
  };
};

const request = async (req, res)=>{
  const {matric_no} = req.params;
  const { request_type } = req.body;
  const price = "80000";
  try{
    // if(!request_type || !matric_no) throw new Error("Invalid Request");

    const getStudent = await models.Student.findOne({
      where:{
        matric_no
      }
    });

    if(!matric_no) throw new Error('Something went wrong');

    const request_id = uuidv4();

    const requestData = {
      request_id,
      student_id: getStudent.dataValues.student_id,
      email: getStudent.dataValues.email,
      matric_no,
      price,
      request_status: requestStatus.Pending,
      request_type: request_type,
    };

    await models.Request.create(requestData);

    const paymentData = {
      payment_id: uuidv4(),
      student_id: getStudent.dataValues.student_id,
      request_id,
      payment_status: paymentStatus.Unpaid
    };

    await models.Payment.create(paymentData);

    delete requestData.student_id;


    res.status(200).json({
      status: true,
      message: "Request submitted successfully.",
      data: requestData
    });

  
  }catch(err){
    console.log(err)
    res.status(500).json({
      status: false,
      message: err.message || "Server Error"
    });
  };
};


const startRequestPayment = async (req, res) => { 
  const { amount, email } = req.body
  
  try{
    if (!amount || !email) throw new Error('Amount and Email needed');

    const initialiseTransaction  = await startPayment(amount, email)
      delete initialiseTransaction.data.data.access_code
      res.status(200).json({
          status: true,
          message: "Transaction initialized successfully",
          data: initialiseTransaction.data.data
      });
    
  }catch(err){
    res.status(500).json({
      status: false,
      message: err.message || 'Server Error.'
    })
  }
};

const completeRequestPayment = async (req, res) => { 

  const { reference, student_id, request_id } = req.body;
  try{
    if (!reference || !student_id || !request_id ) throw new Error('All fields are required');

    const checkRefrence = await models.Refrence.findOne({
      where:{
        refrence: reference
      }
    });
  
    if(checkRefrence) throw new Error('Reference is not valid.')
  
    const completeTransaction = await completePayment(reference);
    if (completeTransaction.data.data.status !="success") throw new Error("Invalid transaction reference");

   
    
    const createReference = {
      refrence_id: uuidv4(),
      student_id,
      refrence: reference,
    };
  
    await models.Refrence.create(createReference);
  
    await models.Payment.update({
      payment_status: paymentStatus.Paid
    },{
      where: {
        student_id,
        request_id

      }
    })
  
    await models.Request.update({
      request_status: requestStatus.Completed
    },{
      where:{
        student_id,
        request_id
      }
    });

   
  
    res.status(200).json({
        status: true,
        message: 'Payment went successfully',
    })

  }catch(err){

    console.log(err)
    res.status(500).json({
      status: false,
      message: err.message || 'Server Error'
    })
  }
}


module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  forgetPassword,
  forgetPasswordOtp,
  login,
  getStudentProfile,
  request,
  startRequestPayment,
  completeRequestPayment

};


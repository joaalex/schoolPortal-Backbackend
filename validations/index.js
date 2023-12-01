 const Joi = require('joi');

 const studentSignupValidation = (body) =>{
  const signUpSchema = Joi.object({
    surname: Joi.string().min(3).required(),
    othernames: Joi.string().min(3).required(),
    gender: Joi.string().required().valid('male', 'female'),
    email: Joi.string().email().required(),
    image_url: Joi.string().required(),
    password: Joi.string().required(),
    repeat_password: Joi.ref('password'),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    faculty: Joi.string().required(),
    department: Joi.string().required(),
    school: Joi.string().required(),
  });

  return {error, value} = signUpSchema.validate(body)
 };


 const loginValidation = (body)=>{
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return { error, value} = loginSchema.validate(body);
 };

 



 module.exports = {
                  studentSignupValidation,
                  loginValidation
 };
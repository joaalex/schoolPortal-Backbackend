require('dotenv').config();
const jwt = require('jsonwebtoken');
const models = require('../models')

const authorization = (req,res,next)=>{

  const {authorization} = req.headers;

  try{
    if(!authorization) throw new Error('Unauthorized ....');

    const splitToken = authorization.split(" ")[1]

    jwt.verify(splitToken, process.env.JWT_SECRET, async(err, decoded)=>{
      if(err) throw new Error(err.message);

      const email = decoded.email;

      const getUser = await models.Student.findOne({
        where:{
          email
        }
      });

      if(!getUser) throw new Error('Unauthorize Access.....')

      req.params.email = getUser.dataValues.email;
      req.params.student_id = getUser.dataValues.student_id;
      req.params.matric_no = getUser.dataValues.matric_no;

      next();
    });


  }catch(err){
    console.log(err)
    res.status(500).json({
      status: false,
      message: err.message || 'Serever Error'
    })
  }
}

module.exports={
  authorization
};
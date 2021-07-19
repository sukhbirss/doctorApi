const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user  
  });
};

exports.signup = async(req,res,next) => {
	try{
		const newDoctor = await Doctor.create({
		    first_name: req.body.first_name,
		    last_name: req.body.last_name,
		    password: req.body.password,
		 	userId:req.body.userId,
		  });

  		createSendToken(newDoctor,200,res);

	}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
};

exports.login = async(req,res,next) => {
	try{
		const { userId,password } = req.body;
		const doctor = await Doctor.findOne({ userId })
		if (!doctor || !(await doctor.correctPassword(password, doctor.password))) {
		    res.status(400).json({
				status: "failed",
		        error: "wrong credintials"
			})
		  }
  		createSendToken(doctor,200,res);

	}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
};
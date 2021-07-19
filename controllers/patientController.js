const Patient = require('../models/patientModel');
const multer = require('multer');
const fs = require('fs');
const imgToPDF = require('image-to-pdf');
var Tesseract = require('tesseract.js');
const path = require('path')
const { extractData } = require('./../util/extractData');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  }
});

const upload = multer({storage:storage});

exports.addPatient = async(req,res,next) => {
	try{
		const newPatient = await Patient.create({
			UHID_NO:req.body.UHID_NO,
			IPD_NO:req.body.IPD_NO,
			Month_No:req.body.Month_No,
			mediclaim:req.body.mediclaim,
			MLC:req.body.MLC,
			DOA:req.body.DOA,
			DOD:req.body.DOD,
			DOB:req.body.DOB,
			patient_name:req.body.patient_name,
			age:req.body.age,
			sex:req.body.sex,
			occupation:req.body.occupation,
			address:req.body.address,
			police_thana:req.body.police_thana,
			town:req.body.town,
			nationality:req.body.nationality,
			case:req.body.case,
			room:req.body.room,
			mobile:req.body.mobile,
			consultant:req.body.consultant,
			doctor:req.user.id,
		    admission_form:req.body.admission_form
		  });
	  res.status(200).json({
	    status: 'success',
	    newPatient  
	  });
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


exports.updatePatient = async(req,res,next) => {
	try{
	    const isEmpty = value =>
			  value === undefined ||
			  value === null ||
			  (typeof value === "object" && Object.keys(value).length === 0) ||
			  (typeof value === "string" && value.trim().length === 0);

		 const updatedFields = {};
		 Object.keys(req.body).forEach(key => {
		   if (!isEmpty(req.body[key])) {
		     updatedFields[key] = req.body[key];
		   }
		 });

		const updatedPatient = await Patient.findByIdAndUpdate(req.body.id,updatedFields);
		  res.status(200).json({
		    status: 'success',
		    updatedPatient  
		  });

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



exports.getPatients = async(req,res,next) => {
	try{
		  const patients =  await Patient.find({doctor:req.user.id})
		  res.status(200).json({
		        status:'success',
		        patients
		      })
	}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
}


exports.uploadUserPhoto = upload.single('photo')

exports.imagetotext = async(req,res,next) => {
	try{

		//path of image saved
		const image = path.join(__dirname, '../', req.file.path)

		//Number of pages
		const pages = [`${req.file.path}`]
		//path of pdf saved
		const pdfPath = `/uploads/${req.user.id}-${Date.now()}.pdf`
		//pdf package
		imgToPDF(pages, 'A4')
		   .pipe(fs.createWriteStream(`.${pdfPath}`));

		//detecting text from image
		Tesseract.recognize(
				  image,
				  'eng',
				  { logger: m => console.log(m) }
				).then(({ data: { text } }) => {

				  const data = extractData(text)

				  //deleting stored image
				  fs.unlink(image, (err) => {
					  if (err) {
					    console.error(err)
					    return
					  }
					})
		console.log(data)		  
				  res.status(200).json({
			    	status: 'success',
			    	data,
			    	pdfPath
			  });
		})
	}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
}

exports.images = async(req,res,next) => {
	try{
		const pages = [`${req.file.path}`]
		//path of pdf saved
		const pdfPath = `/uploads/${req.user.id}-${Date.now()}.pdf`
		//pdf package
		imgToPDF(pages, 'A4')
		   .pipe(fs.createWriteStream(`.${pdfPath}`));

		const path = req.file.path
		//deleting the image stored before to make pdf..now we have pdf we dont need to store image
		fs.unlink(path, (err) => {
		  if (err) {
		    console.error(err)
		    return
		  }
		})
		//deletion of stored image and generation of pdf is done
		req.pdf = pdfPath
		next();
	}
	catch(err){
		res.status(400).json({
			status: err.status,
	        error: err,
	        message: err.message,
	        stack: err.stack
		})
	}
}

exports.updatePatientDocuments = async(req,res,next) => {
	try{
		const pages = [`${req.file.path}`]
		//path of pdf saved
		const pdfPath = `/uploads/${req.user.id}-${Date.now()}.pdf`
		//pdf package
		imgToPDF(pages, 'A4')
		   .pipe(fs.createWriteStream(`.${pdfPath}`));

		const path = req.file.path
		//deleting the image stored before to make pdf..now we have pdf we dont need to store image
		fs.unlink(path, (err) => {
		  if (err) {
		    console.error(err)
		    return
		  }
		});

		if(req.body.dischargeform){
			const patient = await Patient.findByIdAndUpdate(req.body.id,{discharge_form:pdfPath});
			  res.status(200).json({
			    status: 'success',
			    patient,
			    pdfPath  
			  });
		}
		if(req.body.hospitalsfiles){
			const patient = await Patient.findByIdAndUpdate(req.body.id,{hospitalfiles:pdfPath});
			  res.status(200).json({
			    status: 'success',
			    patient,
			    pdfPath  
			  });
		}
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


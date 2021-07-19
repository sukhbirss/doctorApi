const { model, Schema } = require('mongoose');

const patientSchema = new Schema({
  UHID_NO: {
    type:Number,
  },
  IPD_NO: {
    type:String,
  },
  Month_No: {
    type:String,
  },
  mediclaim: {
    type:String,
  },
  MLC: {
    type:String,
  },
  DOA:{
    type:Date,

  },
  DOD:{
    type:Date,
  },
  patient_name: {
  	type:String,
	},
  age: {
    type:Number,
  },
  sex: {
  	type:String,
	},
  DOB:{
  	type:Date,
  },
  occupation:{
    type:String,
  },
  address:{
    type:String,
  },
  police_thana:{
    type:String,
  },
  town:{
    type:String,
  },
  nationality:{
    type:String,
  },
  bill_No: {
    type:Number,
  },
  case:{
    type:String,
  },
  room:{
    type:String,
  },
  mobile: {
    type:Number,
  },
  consultant:{
    type:String,
  },
  admission_form:{
    type:String,
  },
  hospitalfiles:{
    type:String,
  },
  discharge_form:{
    type:String,
  },
  doctor:{
    type:Schema.ObjectId,
    ref:"Doctor"
  },
});

module.exports = model('Patient', patientSchema);

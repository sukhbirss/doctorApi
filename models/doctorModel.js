const { model, Schema  } = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new Schema({
  userId: {
  	type:String,
  	required:[true,'please provide userId'],
  },
  password:{
    type:String,
    required:[ true, 'please enter your password'],
  }
});


doctorSchema.pre('save', async function(next) {
	if(!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password,12)
  	next();
})

//To verify password
doctorSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
	console.log(await bcrypt.compare(candidatePassword, userPassword))
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = model('Doctor', doctorSchema);

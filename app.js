const express = require('express');
const cors = require('cors');
const app =express();
const Doctor = require('./models/doctorModel');
const doctorRoutes = require('./routers/doctorRouter');
const patientRoutes = require('./routers/patientRouter');



app.use(express.json({limit: '10kb'}));
app.use(cors())

app.use((req,res,next) => {
	console.log("hello from the middleware............................");
	next()
});


app.use('/api/doctor',doctorRoutes);
app.use('/api/patient',patientRoutes);



module.exports = app;
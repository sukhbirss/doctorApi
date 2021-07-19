const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const { extractData } = require('./util/extractData')
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .then(() => console.log('DB connection successful!'));
mongoose.connection.on('error',(err)=>{
	console.log("err in mongodb connection",err)

})

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	const text = "o M - -Uniaue Hospital eA.UNIT OF :-S.H.C. & R.C.335,Jawahar Marg Indore-2(MP) Ph. 0731-2534124UHID No| 76965 IPD Form IPD No. | UH/2021/0935Month NOELISB Mediclaim | No MLC ' No DOA '11/12/2020 07:11PMPatient Name |MAST EKAKSH INANI S/0 MR. PRAVESH JI INANI S sAge &Sexi0Y 6 M0 D Male DOB ' Religion | Hindu Occupation |T Address | 11/1 CHATRI BAAG Police Thana | ‘ DOD. Time! Bill No!s ey e e e vl Shon | CRROWAE eCity/Town ‘;{qqqrgzrflgt?hy? Pradesh Nationality ' IndiaConsultant |DR. PRAKHER NYATI Mo.: 9039858755 ' S eFood C O Allergyl - * Room No. | DELUX/DO8Diagnosis [ eet wd g B WAtyﬁmmmmmwwawmwwm#mmanammFRET e/ §1mm#mmmmmasmﬁqgwmmamgﬁmﬁmammﬁmﬂHICNEATC Troiet Hea/&een | I Tw o agem R v & 6y .-?) R/EER Bl T, AT , T FeqE B GO A 3 T /A T I @ AN W IR TSAEER T PR aW F P Rare T8 eI/tR) & IS & T e & TR A AR § o FH AR @ A ST o & o g 1 el o veR & s &wd g /ae w1 & W oXE & Mot (W) g B e /e § aur gw weedt & P R e wRE& TE He/BEA|3) ¥ reuare ofeR 3 WA (Attendant) ¥ TR BIUE BT T BET /A G ST TR 3 TOAT T @SF FET P/v)#mamasm(ﬁw,aﬁam)#eﬁm#mﬁmw&haﬂmﬁ:ﬁmaﬁﬁm| U AR # 3RaH & & geaeh Fle & wy Wo) % el ol T W garEAr & s i R S/ § A A qw o A & A P o & sz shae TR| R g e @&) fnelt off e & A Rare f ARy #F =r &7 A% INDORE oeR 24w |D Check out time is 11:00 AM DTR |e TaTEa MR PRAVESH I INANIAl | MAST EKAKSH INANI S/O MR. PRAVESH JI INANI 0% ¥ Rear :Fatherooy o1, | 7898412491 BT . 7898412491& 1 11/1 CHATRI BAAGlame and Signature of Admitting Clerk - =Admin|"
  console.log(extractData(text))
  console.log(`App running on port ${port}...`);
});
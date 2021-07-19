function myfunc(i,text,a,b,c,d,e){
  let j;
   for(j = i+a;j<i+b;j++){
            if(text[j] === c && text[j+1] === d && text[j+2] === e){
             return j;
            }
  }
}

exports.extractData = (text) => {
let obj={}
  for(let i=0;i<text.length;i++){
    if(text[i] === 'U'&& text[i+1] === 'H'&& text[i+2] === 'I' ){
        obj.UHID_NO =  text.substring(i+8, i+15).trim();
          }
       if(text[i] === 'I'&& text[i+1] === 'P' && text[i+2] === 'D' ){
         let j = myfunc(i,text,8,30,'M','o','n') || i+10;;
          obj.IPD_NO =  text.substring(i+8, j).trim();
          }
       if(text[i] === 'M'&& text[i+1] === 'e' && text[i+2] === 'd' ){
         let j = myfunc(i,text,12,40,'M','L','C') || i+10;;
        obj.mediclaim =  text.substring(i+12, j).trim();
          }
       if(text[i] === 'M'&& text[i+1] === 'L' && text[i+2] === 'C' ){
        let j = myfunc(i,text,0,50,'D','O','A') || i+10;;
        obj.MLC =  text.substring(i+6, j).trim();
          }
       if(text[i] === 'D'&& text[i+1] === 'O' && text[i+2] === 'A' ){
        if(text.substring(i+4, i+23).includes('/')){
          obj.DOA =  text.substring(i+4, i+23);
            }
          }
       if(text[i] === 'D'&& text[i+1] === 'O' && text[i+2] === 'B' ){
        if(text.substring(i+4, i+23).includes('/')){
            obj.DOB = text.substring(i+4, i+23)
              }
          }
       if(text[i] === 'D'&& text[i+1] === 'O' && text[i+2] === 'D' ){
        if(text.substring(i+4, i+23).includes('/')){
          obj.DOD =  text.substring(i+4, i+23);
            }
          }
       if(text[i] === 'P'&& text[i+1] === 'a' && text[i+2] === 't' ){
        let j = myfunc(i,text,0,100,'A','g','e') || i+10;;
        obj.patient_name =  text.substring(i+14, j);
          }
       if(text[i] === 'R'&& text[i+1] === 'e' && text[i+2] === 'l' ){
        obj.religion =  text.substring(i+4, i+25).split(' ')[2];
          }
       if(text[i] === 'A'&& text[i+1] === 'd' && text[i+2] === 'd' ){
        let j = myfunc(i,text,0,50,'P','o','l') || i+10;;
        obj.address =  text.substring(i+9, j).trim();
          }
       if(text[i] === 'R'&& text[i+1] === 'o' && text[i+2] === 'o' ){
        let j = myfunc(i,text,0,50,'D','i','a') || i+10;;
        obj.room =  text.substring(i+10,j).trim();
          }
       if(text[i] === 'C' && text[i+1] === 'o' && text[i+2] === 'n' ){
        let j = i+10;
         for(j = i;j<i+50;j++){
            if(text[j] === 'M' && text[j+1] === 'o' && text[j+2] === '.'){
              break;
            }
         }
        obj.consultant =  text.substring(i+12, j).trim();
          }
      if(text[i] === 'T' && text[i+1] === 'o' && text[i+2] === 'w' ){
        let j = myfunc(i,text,0,100,'N','a','t') || i+10;;
        obj.city =  text.substring(i+5, j).trim();
          }
      if(text[i] === 'B' && text[i+1] === 'i' && text[i+2] === 'l' ){
        let j = myfunc(i,text,0,100,'C','a','s') || i+10;
        obj.Bill =  text.substring(i+7, j).trim();
          }  
  }

  return obj
}
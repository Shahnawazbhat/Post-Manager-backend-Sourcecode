const sgMail   =  require ('@sendgrid/mail'); 
const dotenv = require('dotenv'); 

dotenv.config(); 

 sgMail.setApiKey(process.env.SEND_GRID_API_KEY); 
 
 const   sendGrid   =   async   (msg)   =>   { 
   try   { 
     const   response   =   await   sgMail.send(msg); 
     console.log('Email   sent   successfully:',   response); 
     return   response; 
   }   catch   (error)   { 
     console.error('Error   sending   email:',   error.message); 
     throw   error; 
   }  
 }; 
 
 module.exports= sendGrid; 

const registerTemplate  =require("../templates/register.js"); 
const sendGrid   =require("./sendGrid.js"); 
const   sendEmail   =   ({ 
   email, 
   subject,   
   project_name, 
   html,
   otp, 
   type, 
   user, 
   another_type, 
   token ,
   password,
   resetUrl,
   name,
   item_name,
   deep_link
})   =>   { 
console.log(
  {
    email, 
    subject,   
    project_name, 
    html,
    otp, 
    type, 
    user, 
    another_type, 
    token ,
    password,
    resetUrl,
    deep_link
  },"in console"
)
  
   switch   (html)   { 
     case   "register": 
       subject   =   `Verify   Your   ${project_name}   Account`; 
       html   =   registerTemplate(project_name,   otp,   user,   another_type); 
       break; 
       default: 
       break; 
   } 

   const   msg   =   { 
     to:   `${email}`, 
     from:   process.env.SEND_GRID_SENDER, 
     subject:   subject   ?   subject   :   `Verify   Your   ${project_name}   Account`, 
     text:   "Dont   share   this   Link", 
     html, 
   }; 

   sendGrid(msg); 
}; 

 module.exports=sendEmail;
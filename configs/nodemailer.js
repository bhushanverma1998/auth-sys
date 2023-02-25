const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

//Create the transporter to send mail
let transporter=nodemailer.createTransport({
    service:process.env.SERVICE,
    host:process.env.HOST,
    port:process.env.PORTS,
    secure:true,
    auth:{
        user:process.env.GMAIL_UNAME,
        pass:process.env.GMAIL_PASS
    }
});

//html templates to send in mail
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering',err); return;};
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={transporter,renderTemplate}
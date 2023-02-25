const nodemailer=require('../configs/nodemailer');

exports.resetPassword=(user)=>{
    //get html string from ejs
    let htmlString=nodemailer.renderTemplate({user:user},'/password_reset.ejs');

    nodemailer.transporter.sendMail({
        from:'bhushanvermalaptop@gmail.com',
        to:user.email,
        subject:'Reset Password Link!',
        html:htmlString
    },(err,info)=>{
        if(err){console.log('Error in sending Mail',err); return;};
        console.log('message sent',info);
        return;
    }
    )
}

exports.resetPasswordSuccess=(user)=>{
    let htmlString=nodemailer.renderTemplate({user:user},'/password_success.ejs');

    nodemailer.transporter.sendMail({
        from:'bhushanvermalaptop@gmail.com',
        to:user.email,
        subject:'Password Reset Successfully',
        html:htmlString
    },(err,info)=>{
        if(err){console.log('Error in sending Mail',err); return;};
        console.log('message sent',info);
        return;
    })
}
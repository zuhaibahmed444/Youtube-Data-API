const nodemailer = require('nodemailer');
// Save the credentials file in folder and add the path below
const credentials = require('./zuhaib-367615-e7443966834b.json');
const fs = require('fs')
 

// send mail to the user with data
const sendmail = async(dat,res)=>{
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zuhaibahmed444@gmail.com',
            pass: credentials.password,
        }
    });
    let filecontent = JSON.stringify(dat);
        let mailDetails = {
            from: 'zuhaibahmed444@gmail.com',
            to: 'zuhaibahmeds27@gmail.com',
            subject: 'Youtube Video Data',
            text: filecontent,
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                res.send("Error sending mail: " + err)
            } else {
                console.log(data);
                res.send({message :"mail successfully sent with data" ,data : dat})
            }
        });
    };



module.exports = {
    sendmail
}
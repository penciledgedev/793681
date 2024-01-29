const dotenv = require('dotenv');
dotenv.config({});

const api_key = process.env.MAILGUN_API_KEY || "key-d83e2097dcdd8d535b50f1ae7b924f68"

const domain = 'grow.netgro.co';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

const sendMail = async (data) => {
    try {
    const send =  await mailgun.messages().send(data) 
console.log(send)
console.log("lol")
    } catch (error) {
      console.log("error")
       console.log(error); 
     
    }
}


module.exports = sendMail

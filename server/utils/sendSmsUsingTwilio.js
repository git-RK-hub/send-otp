const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMSUsingTwilio = async (phone, message) => {

  let status = false;
  try {
    const res = await client.messages
      .create({
         body: message,
         from: `${process.env.TWILIO_PHONE_NUMBER}`,
         to: phone
       })
    
    if(res.status == 'sent') 
      status = true;
  } catch(err) {
    status = false;
  }
  return status;
}

module.exports = sendSMSUsingTwilio;
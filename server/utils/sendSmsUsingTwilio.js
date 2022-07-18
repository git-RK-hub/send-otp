const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMSUsingTwilio = async (phone, message) => {
  let status = false;
  let errorMsg = '';
  try {
    const res = await client.messages
      .create({
         body: message,
         from: `${process.env.TWILIO_PHONE_NUMBER}`,
         to: phone
       })
    if(res.status == 'queued') 
      status = true;
  } catch(err) {
    errorMsg = err.message;
    status = false;
  }
  return { errorMsg, status };
}

module.exports = sendSMSUsingTwilio;
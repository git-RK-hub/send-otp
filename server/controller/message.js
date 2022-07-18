const { v4 : uuidv4 } = require('uuid');
const sendSMSUsingTwilio = require('../utils/sendSmsUsingTwilio');
const ContactController = require('./contact');

const messageList = [];

const createMessages = (message) => {
    const messageId = uuidv4();
    const { otp, contactId } = message;
    const timestamp = new Date(Date.now());

    const newMessage= {
        id: messageId,
        otp,
        timestamp,
        contactId
    }

    messageList.push(newMessage);

    return true;
}

exports.getMessagesWithUser = (req, res) => {
    let messagesWithUser = [];
    
    if(messageList.length > 0) {
        messagesWithUser = messageList.map((message) => {
            req.params.contactId = message.contactId;
            req.force = true;
            const contact = ContactController.getContactById(req, res);
            return {
                ...message,
                user: contact.firstname + ' ' + contact.lastname
            }
        });

        messagesWithUser.sort((message1, message2) => new Date(message1.timestamp) - new Date(message2.timestamp));
    } 
    return res.status(200).json({
        status: 'success',
        results: messagesWithUser.length,
        data: messagesWithUser
    })
}

exports.sendOTP = async (req, res) => {
    const { otpString } = req.body;
    const { contactId } = req.params;

    if(!otpString) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing message string'
        })
    }
    const otp = otpString.split(':')[1].trim();

    if(!otp) return res.status(400).json({
        status: 'fail',
        message: 'otp is missing'
    })

    if(otp.length != 6) return res.status(400).json({
        status: 'fail',
        message: 'otp should be of length 6'
    });

    if(!contactId) return res.status(400).json({
        status: 'fail',
        message: 'contact id is missing'
    })

    req.force = true;
    const contact = ContactController.getContactById(req, res);

    if(!contact) {
        return res.status(500).json({
            status: 'fail',
            message: 'Contact with id ' + contactId + ' is missing'
        })
    }
    const isMessageSent = await sendSMSUsingTwilio(contact.contactNo, otpString);

    if(isMessageSent.status) {
        if(createMessages({otp, contactId})) {
            res.status(201).json({
                status: 'success',
                message: 'OTP sent succesfully'
            })
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Something went wrong'
            })
        }
    } else {
        return res.status(500).json({
            status: 'fail',
            message: isMessageSent.errorMsg || 'Twilio failed to send otp'
        })
    }
}
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ContactContext } from '../../contexts/contact';

import { useAPI } from '../../contexts/hooks';
import { MessageContext } from '../../contexts/message';
import { getRandomNumber } from '../../utils/generateRandomNumber';

const MessageForm = () => {
    const message = { otp: getRandomNumber(6) };
    const history = useHistory();
    
    const [inputMessage, setInputMessage] = useState(`Hi your otp is : ${message.otp}`);
    
    const { id } = useParams();
    const { sendMessage } = useAPI(MessageContext);
    const { contactById: contact } = useAPI(ContactContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isSent = await sendMessage(id, inputMessage);
        if (isSent) history.push('/user')
    }

    return (
        <div className="box">
            <h3>Send message to {contact.firstname + ' ' + contact.lastname}</h3>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-group'>
                    <input className="form-control"
                        type="text"
                        name="message"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <button style={{ width: "100%" }} className="btn btn-dark ">Send</button>
                </div>
            </form>
        </div>
    );
}

export default MessageForm;

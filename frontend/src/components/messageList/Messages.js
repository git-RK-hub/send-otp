import React, { useEffect } from 'react';

import { useAPI } from '../../contexts/hooks';
import { MessageContext } from '../../contexts/message';
import MessageRow from './MessageRow'

const Messages = () => {
    const { data: messageList, fetchMessagesData } = useAPI(MessageContext);

    useEffect(() => {
        fetchMessagesData();
    }, [fetchMessagesData]);

    if (!messageList)
        return null;
    else
        return (
            <div className='container'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Contact Name</th>
                            <th scope='col'>OTP Sent</th>
                            <th scope='col'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messageList?.map((message) => (
                            <MessageRow
                                key={message.id}
                                {...message}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default Messages;

import React from 'react';

const MessageRow = (props) => {
    return (
        <tr>
            <td>{props.user}</td>
            <td>{props.otp}</td>
            <td>{new Date(props.timestamp).toLocaleString()}</td>
        </tr>
    );
}

export default MessageRow;

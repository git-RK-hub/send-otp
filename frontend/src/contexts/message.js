import React, {
    useState, createContext, useCallback
} from 'react';
import axios from 'axios';

export const MessageContext = createContext();

function MessageContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (contactId, message) => {
        try {
            const { data }  = await axios.post(`http://localhost:3030/api/message/${contactId}/send-otp`, 
                {
                    otpString: message
                }
            );
            if (data.status === 'success') {
                alert(data.message);
                return true;
            } else {
                alert(data.message);
                return true;
            }
        } catch (error) {
            const err = { ...error.response.data } || 'Something went wrong';
            console.log(err)
            alert(err.message);
            return false;
        }
    }, []);


    const fetchMessagesData = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data: {data: messages } } = await axios.get('http://localhost:3030/api/message/');
            setIsLoading(false);
            setData(messages);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, []);

    return (
        <MessageContext.Provider value={{ data, fetchMessagesData, isLoading, sendMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

export default MessageContextProvider;
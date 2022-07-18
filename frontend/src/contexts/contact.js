import React, {
    useState, createContext, useCallback
} from 'react';
import axios from 'axios';
export const ContactContext = createContext();

function ContactContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [contactById, setContactById] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const fetchContactById = useCallback(async (id) => {
        try {
            const { data: { data: contact } } = await axios.get(`http://localhost:3030/api/contact/${id}`);
            setContactById(contact);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchContactsData = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data: {data : contacts}} = await axios.get('http://localhost:3030/api/contact/');
            setIsLoading(false);
            setData(contacts);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    },[]);

    return (
        <ContactContext.Provider value={{ data, isLoading, fetchContactsData, fetchContactById, contactById }}>
            {children}
        </ContactContext.Provider>
    );
}

export default ContactContextProvider;

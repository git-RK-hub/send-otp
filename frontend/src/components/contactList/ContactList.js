import React, { useEffect } from 'react';

import { useAPI } from '../../contexts/hooks';
import { ContactContext } from '../../contexts/contact';
import ContactListRow from './ContactListRow'

const ContactList = () => {
    const {data: contacts, fetchContactsData} = useAPI(ContactContext);

    useEffect(() => {
        fetchContactsData();
    }, [fetchContactsData]);

    if(!contacts)
        return null;
    else
        return (
            <div className='container'>
                <h6 className='test text-center text-info'>Use the 2nd contact to send the message</h6>
                <h3 className='text-center mt-2'>List of Contacts</h3>
                <div className='table-responsive'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">Contact Name</th>
                                <th scope="col">Contact Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts?.map((contact)=>(
                                <ContactListRow
                                key={contact.id}
                                {...contact}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}

export default ContactList;

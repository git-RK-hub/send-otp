import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAPI } from '../../contexts/hooks';
import { ContactContext } from '../../contexts/contact';

const ContactDetails = () => {
    const { id } = useParams();
    const { contactById: contact, fetchContactById } = useAPI(ContactContext);

    useEffect(() => {
        fetchContactById(id);
    }, [fetchContactById, id]);

    if (contact) {
        const fullName = [contact.firstname, contact.lastname].join(' ');
        return (
            <div className='container'>
                <div className="row mx-lg-2 mx-md-2 mr-2">
                    <div className="p-1 table-responsive">
                        <div className="pl-2 pt-3 pb-2 bg-light text-dark heading">
                            <h5>Contact Details</h5>
                        </div>
                        <table className="table table-striped table-bordered contact-info">
                            <tbody>
                                <tr>
                                    <th>Full Name:</th>
                                    <td>
                                        {fullName}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contact No:</th>
                                    <td>
                                        {contact.contactNo}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>
                                        {contact.emailId}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="sendMessage-wrapper">
                            <Link to={`/user/${contact.id}/compose`}>
                                <button className="btn btn-dark m-2">Send Message</button>
                            </Link>
                            <Link to="/user">
                                <button className="btn btn-outline-dark">Go back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default ContactDetails;

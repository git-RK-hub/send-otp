import React from 'react';
import { Link } from 'react-router-dom';

const ContactListInfo = (props) => {
    const fullName = [props.firstname,props.lastname].join(' ');

    return (
        <tr>
            <td><Link to={`/user/${props.id}`}>{fullName}</Link></td>
            <td className="d-flex justify-content-between">{props.contactNo}
                <Link to={`/user/${props.id}`}>
                    <button type="button" class="btn btn-outline-dark">View</button>    
                </Link>
            </td>
        </tr>
    );
}

export default ContactListInfo;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ContactList from '../components/contactList/ContactList'
import ContactDetails from '../components/contactDetails/ContactDetails';
import SendMsgForm from '../components/contactDetails/SendMsgForm';
import Messages from '../components/messageList/Messages';
import Navbar from '../components/navbar';

const Routers = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/user/:id/compose" component={SendMsgForm} />
                <Route path="/user/:id" component={ContactDetails} />
                <Route path="/messages" component={Messages} />
                <Route path="/" component={ContactList} />
            </Switch>
        </Router>
    );
}

export default Routers;

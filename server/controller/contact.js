const contacts = require('../data/contact.json');

exports.getContactList = (req, res) => {
    if (req.force) {
        return contacts;
    }
    res.status(200).json({
        results: contacts.length,
        status: 'success',
        data: contacts
    });
}

exports.getContactById = (req, res) => {
    const { contactId } = req.params;
    const contact = contacts.find(el => el.id == contactId)
    if (req.force) {
        return contact;
    }
    if(!contact) return res.status(400).json({
        status: 'fail',
        message: 'No contact found with id ' + contactId
    });

    res.status(200).json({
        status: 'success',
        data: contact
    });
}

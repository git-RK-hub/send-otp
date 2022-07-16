const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const ContactRoutes = require('./routes/contact');
const MessageRoutes = require('./routes/message');

const app = express();

const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contact/', ContactRoutes);
app.use('/api/message/', MessageRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

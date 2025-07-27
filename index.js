const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const TestRoute = require('./Routes/TestRoute')
const destination = require('./Routes/destination')
const DestinationModel = require('./Models/Destination')
const ConnectDB = require('./config/db')
const UserRoute = require('./Routes/User')
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
ConnectDB();
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;



app.use('/api/fetch', TestRoute)
app.use('/api/destination', destination)
app.use('/api/User', UserRoute)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

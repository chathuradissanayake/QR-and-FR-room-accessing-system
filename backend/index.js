const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require ('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connection successful'))
.catch((error) => console.log('DB connection failed', error))

require('./models/user');
require('./models/door'); 
require('./models/PermissionRequest');
require('./models/contactUs');
require('./models/History'); 
require('./models/company')

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// cors
app.use(cors({
    origin: process.env.FRONTEND_URL, // Use environment variable
    credentials: true,
  }));

app.use('/api/', require('./routes/authRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/door', require('./routes/doorRoutes'));
app.use('/api/permission', require('./routes/permissionRoutes'))
app.use('/api/contactus', require('./routes/contactRoutes'))
app.use('/api/history', require('./routes/historyRoutes'));

const port =process.env.PORT;
app.listen(port, () =>{console.log(`Server is running on port ${port}`)});






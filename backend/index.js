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
require('./models/permissionRequest');
require('./models/contactUs');

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// cors
app.use(cors({
    origin: process.env.FRONTEND_URL, // Use environment variable
    credentials: true,
  }));

app.use('/', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/door', require('./routes/doorRoutes'));
app.use('/permission', require('./routes/permissionRoutes'))
app.use('/contactus', require('./routes/contactRoutes'))


const port =process.env.PORT;
app.listen(port, () =>{console.log(`Server is running on port ${port}`)});






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

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/askPermision', require('./models/askPermision'))
app.use('/contactus', require('./models/contactUs'))
app.use("/face", require("./routes/faceRoutes"));
app.use("/leave", require("./routes/leaveRoutes"));

const port =process.env.PORT;
app.listen(port, () =>{console.log(`Server is running on port ${port}`)});






const express = require('express')
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Parse JSON bodies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;


const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Allow requests from different origins
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth',require('./routes/authJwt'))
app.use('/notes',require('./routes/notesRoute'))
app.use('/user',require('./routes/userRoutes'))

app.listen(PORT , ()=>{
    console.log('listening..' , PORT)
})
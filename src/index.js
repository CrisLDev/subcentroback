const express = require('express');
const connectDB = require('./database');
const morgan = require('morgan');
const cors = require('cors');
const multer  = require('multer')
const path = require('path');
const app = express();

connectDB();

const PORT = process.env.PORT || '4123'

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => res.send('Api is running'))

// This folder for this application will be used to store public files
app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('photo'));

app.use("/public", express.static(path.join(__dirname, "./public")));

// Routes
app.use('/api/dates', require('./routes/datesRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/consulting', require('./routes/consultingRoutes'));
app.use('/api/especialities', require('./routes/especialitiesRoutes'));
app.use('/api/schedules', require('./routes/scheduleRoutes'));

app.listen(PORT, () => { console.log('Server is running on port', PORT) });
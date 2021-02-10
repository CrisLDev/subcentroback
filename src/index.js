const express = require('express');
const connectDB = require('./database');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

connectDB();

const PORT = process.env.PORT || '4123'

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => res.send('Api is running'))

// Routes
app.use('/api/dates', require('./routes/datesRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => { console.log('Server is running on port', PORT) });
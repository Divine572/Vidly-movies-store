const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const express = require('express');

app = express();

mongoose.connect('mongodb://localhost/vidly')  // { useNewUrlParser: true }
    .then(() => console.log('Connected to mongodb..'))
    .catch(err => console.error('Could not connect to mongodb server..'));

// mongoose.set({ useUnifiedTopology: true });

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}.....`));
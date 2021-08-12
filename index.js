const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const customers = require('./routes/customers')
app = express();

mongoose.connect('mongodb://localhost/vidly')  // { useNewUrlParser: true }
    .then(() => console.log('Connected to mongodb..'))
    .catch(err => console.error('Could not connect to mongodb server..'));

// mongoose.set({ useUnifiedTopology: true });

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}.....`));
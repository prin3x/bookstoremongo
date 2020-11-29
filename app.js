require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bookRoutes = require('./routes/bookRoutes')

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(res => console.log('HandicapDB Connection success'));  

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', bookRoutes)




const PORT = process.env.PORT ?? 8000

app.listen(PORT, console.log(`The Server Is Running On ${PORT}`))
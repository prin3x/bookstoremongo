require('dotenv').config();
const mongoose = require('mongoose')
const Book = require('../models/bookModel')
const fs = require('fs')



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


  const books = JSON.parse(fs.readFileSync(`${__dirname}/bookData.json`, 'utf-8'))

  const importData = async () => {
    try {
      await Book.create(books)
      console.log('Data successfully loaded')
      process.exit()
    } catch (error) {
      console.log(error)
    }
  }


  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      await Book.deleteMany()
      console.log('Data successfully deleted!')
    } catch (error) {
      console.log(error)
    }
  }

  if(process.argv[2] === '--import') {
    importData()
  } else if (process.argv[2] ==='--delete') {
    deleteData()
  }

  console.log(process.argv)
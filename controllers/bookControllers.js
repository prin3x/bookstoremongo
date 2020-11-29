const Book = require('../models/bookModel');

exports.findAllBook = async (req, res) => {
  try {
    const queryObj = JSON.parse(JSON.stringify(req.query));
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let totalLength = (await Book.find()).length
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/, match => `$${match}`)
    const page = req.query.page * 1  || 1
    const limit = 10
    const skip = (page - 1) * limit

    let query = await Book.find().skip(skip).limit(limit)
    
    if(req.query.title) {
      const {title} = req.query
      query = await Book.find({title: {$regex : `.*${title}.*`}}).skip(skip).limit(limit)
      totalLength = await Book.find({title: {$regex : `.*${title}.*`}}).skip(skip).limit(limit).count()
    }

    const getAllBooks = await query
    
    res.status(200).send({getAllBooks, totalLength});
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something's wrong " });
  }
};

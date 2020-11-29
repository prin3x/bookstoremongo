const router = require('express').Router()
const {findAllBook} = require('../controllers/bookControllers')



router.route('/').get(findAllBook)


module.exports = router
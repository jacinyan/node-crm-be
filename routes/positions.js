const express = require('express')
const router = express.Router()

const { add, list, remove, update, listRefill } = require('../controllers/positions')
const uploadMiddleware = require('../middleware/upload')

router.get('/list', list)
router.post('/add', uploadMiddleware, add)
router.delete('/remove', remove)
router.patch('/update', uploadMiddleware, update)
router.post('/list_refill', listRefill)

module.exports = router
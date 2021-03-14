const Mobile = require('../models/mobile')

exports.positions = async (req, res, next) => {
    let { start, pageSize} = req.query
  
    let result = await Mobile.listPositions(~~start, ~~pageSize)
    if (result) {
        res.json(result)
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Failed to fetch positions list'
            })
        })
    }
}
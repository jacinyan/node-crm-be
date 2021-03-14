const { verify } = require('../utils/tools')

const auth = (req, res, next) => {
  let token = req.get('X-Access-Token')
  try {
    let result = verify(token)
    next()
  } catch (error) {
    res.render('fail', {
      data: JSON.stringify({
        message: 'Please log in'
      })
    })
  }
}

exports.auth = auth
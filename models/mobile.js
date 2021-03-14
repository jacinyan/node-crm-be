const { Position } = require('../utils/db')

exports.listPositions = (start, pageSize) => {
  return Position.find({}).skip(start).limit(pageSize).sort({_id:-1})
}
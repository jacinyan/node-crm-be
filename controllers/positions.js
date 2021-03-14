const Position = require('../models/position')
const moment = require('moment')

exports.add = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')
    let result = await Position.addPosition({
        ...req.body,
        logo: req.logo,
        createTime: moment().format('Do MMMM YYYY HH:mm')
    })
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: 'Position successfully added'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Position failed to add '
            })
        })
    }
}

exports.list = async (req, res, next) => {
    let result = await Position.listPositions()
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

exports.remove = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')
    let result = await Position.removePosition(req.body.id)
    try {
        if (result.deletedCount > 0) {
            res.render('success', {
                data: JSON.stringify({
                    message: 'Position successfully deleted'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: 'Position failed to delete'
                })
            })
        }
    } catch (error) {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Failed to delete'
            })
        })
    }
}

exports.update = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const data = {
        ...req.body
    }
    
    if (req.logo){
        data['logo'] = req.logo
    }

    let result = await Position.updatePosition(data)
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: 'Position successfully updated'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Position failed to update'
            })
        })
    }
}

exports.listRefill = async (req,res,next) => {
    let result = await Position.refillPosition(req.body.id)
    if (result) {
        res.json(result)
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Failed to fetch position'
            })
        })
    }
}
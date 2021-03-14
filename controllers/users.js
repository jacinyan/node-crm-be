// import User model from Model
const User = require('../models/user')
// encrypt password
const { hash, compare, sign, verify } = require('../utils/tools')

const register = async (req, res, next) => {
    const { username, password } = req.body
    // console.log(username, password);
    // set res headers
    res.set('content-type', 'application/json;charset=utf-8')

    // encrypt passwords
    const bcryptPassword = await hash(password)

    // check if a user exists
    let findResult = await User.findUser(username)
    // console.log(findResult); => {userObj} || null

    // response to the result
    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Username exists'
            })
        })
    } else {

        let result = await User.registerUser({
            username,
            password: bcryptPassword
        })

        // register prompt
        console.log(`User ${result.username} is registered`);

        res.render('success', {
            data: JSON.stringify({
                message: 'User successfully added '
            })
        })
    }

}

// users login
const login = async (req, res, next) => {
    const { username, password } = req.body

    let result = await User.findUser(username)
    // authenticate user
    if (result) {
        let { password: hash } = result
        // compare password from frontend and existing hash
        let comparedResult = await compare(password, hash)
        if (comparedResult) {
            // req.session.username = username
            const token = sign(username)
            // custom response header
            res.set('X-Access-Token', token)

            res.render('success', {
                data: JSON.stringify({
                    username
                })
            })
        } else {
            console.log('wrong password');
            res.render('fail', {
                data: JSON.stringify({
                    message: 'Incorrect username or password'
                })
            })
        }
    } else {
        console.log('wrong username');
        res.render('fail', {
            data: JSON.stringify({
                message: 'Incorrect username or password'
            })
        })
    }
}

// users log out
const logout = async (req, res, next) => {
    // req.token = null
    res.render('success', {
        data: JSON.stringify({
            message: 'Successfully Logged out'
        })
    })
}

// get users list
const list = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const listResult = await User.findList()
    res.render('success', {
        data: JSON.stringify(listResult)
    })
}

// delete user
const remove = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const { id } = req.body
    let result = await User.removeUser(id)
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: 'User successfully deleted'
            })
        })
        return
    }
    res.render('fail', {
        data: JSON.stringify({
            message: 'User failed to delete'
        })
    })
}

const isAuth = async (req, res, next) => {
    let token = req.get('X-Access-Token')
    try {
        let result = verify(token)
        res.render('success', {
            data: JSON.stringify({
                username: result.username
            })
        })
    } catch (error) {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Please log in'
            })
        })
    }

    // if (req.session.username) {
    //     
    // } else {
    //     res.render('fail', {
    //         data: JSON.stringify({
    //             message: 'Please log in'
    //         })
    //     })
    // }
}


module.exports = {
    register,
    login,
    logout,
    list,
    remove,
    isAuth
}
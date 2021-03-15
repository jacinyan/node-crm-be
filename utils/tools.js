const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            });
        });
    })
}

exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
            resolve(result)
        });
    })
}

exports.sign = (username) => {
    // const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private_key.pem'))

    const token = jwt.sign({ username }, JSON.parse(process.env.RSA_PRIVATE_KEY), { algorithm: 'RS256', expiresIn: '2h' })
    return token
}

exports.verify = (token) => {
    // const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public_key.pem'))
    
    const result = jwt.verify(token, JSON.parse(process.env.RSA_PUBLIC_KEY))
    return result
}
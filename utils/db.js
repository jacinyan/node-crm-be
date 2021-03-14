const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node-CRM', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

// create user model
const usersSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const usersModel = mongoose.model('users', usersSchema);

// position model
const positionsSchema = new mongoose.Schema({
    logo:String,
    company: String,
    position: String,
    location: String,
    createTime: String,
    salary: String
})

const positionsModel = mongoose.model('positions', positionsSchema)

 
exports.User = usersModel
exports.Position = positionsModel
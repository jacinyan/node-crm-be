const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/node-CRM', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

// create users schema and model
const usersSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const usersModel = mongoose.model('users', usersSchema);

// create positions schema and model
const positionsSchema = new mongoose.Schema({
    logo:String,
    company: String,
    position: String,
    location: String,
    createTime: String,
    salary: String
})

const positionsModel = mongoose.model('positions', positionsSchema)

//exports
exports.User = usersModel
exports.Position = positionsModel
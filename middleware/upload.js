const multer = require('multer')
const mime = require('mime')

const aws = require('aws-sdk')
const multerS3 = require("multer-s3");

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: "ap-southeast-2",
});

const cloudStorage = multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "node-crm-s3-multer-upload",
    metadata: function (req, file, cb) {
        cb(null, { fieldname: file.fieldname });
    },
    key: function (req, file, cb) {
        let extension = mime.getExtension(file.mimetype)
        let filename = file.fieldname + '-' + Date.now() + '.' + extension
        cb(null, filename);
    },
});

const limits = {
    fileSize: 200000,
    files: 1
}

function fileFilter(req, file, cb) {
    const acceptType = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif'
    ]

    if (!acceptType.includes(file.mimetype)) {
        cb(new Error('File type must be either png,jpg or gif'))
    } else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }

}

const upload = multer({
    // storage,
    storage: cloudStorage,
    limits,
    fileFilter
}).single('logo')


const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.render('fail', {
                data: JSON.stringify({
                    message: 'File exceeds 200K'
                })
            })
        } else if (err) {
            res.render('fail', {
                data: JSON.stringify({
                    message: err.message
                })
            })
        } else {
            const { logo_prev } = req.body
            if (req.file && logo_prev) {
                try {
                    console.log('update position with a new logo');
                    req.logo = req.file.key
                } catch (error) {
                    console.log(error);
                }
            } else if (!req.file && logo_prev) {
                req.logo = logo_prev
            } else {
                // console.log(req.file);
                req.logo = req.file.key
            }

            next()
        }
    })
}

module.exports = uploadMiddleware
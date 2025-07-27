const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
        const uniqe = Date.now() + '-' + file.originalname
        cb(null, uniqe)
    }
})

const upload = multer({storage: storage})

module.exports = {upload}
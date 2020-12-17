const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "BookRoom",
    allowedFormats: ["jpg", "jpeg", "png"],
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({
    storage: uploadStorage,
})

const uploadImage = upload.single('photo');

module.exports = uploadImage

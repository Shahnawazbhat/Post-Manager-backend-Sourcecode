const router = require("express").Router();
const multer = require("multer");
const path=require('path')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      console.log("Unsupported file format");
      return cb(new Error("Please upload an image or document (png, jpg, jpegx)"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
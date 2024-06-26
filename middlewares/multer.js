const multer = require("multer");

var uploader = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});

module.exports = uploader;

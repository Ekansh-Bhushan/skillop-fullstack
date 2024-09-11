const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage to keep the file in memory as a buffer
const upload = multer({ storage: storage }).single('profilePic');

module.exports = upload;

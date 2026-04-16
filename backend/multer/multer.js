const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+ "-" + file.originalname);
	}
});

const upload = multer({
	storage,
	limits: {filesize: 2 * 1023 * 1024},
	filter: (req, file, cb) => {
		if (file.mimetype === 'image/') {
			cb(null, true);
		} else {
			cb(new Error("Only images are allowed"), false);
		}
	}
});


module.exports = {storage, upload};
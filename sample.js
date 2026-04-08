//Connect to MongoDB
//Set Schema, model, e.t.c
//Retrieve from MongoDB
//Insert into MongoDB
//Delete From MongoDB
//React.js api call useEffect
//React.js submiting form both normal & filedata
//Express storage setup for files
//Express routing files
//Express serve uploaded files

const mongoose = require('mongoose');
const express = require('express');

const app = express();


app.use('/uploads', express.static('uploads'));


mongoose.connect('db/url')
.then(() => console.log("MongoDB Connected"));

const todoSchema = new mongoose.Schema({
	item: String
});

const Todo = mongoose.model('Todo', todoSchema);


app.get('/todo', async (req, res) => {
	 try {
	 	const data = await Todo({}).find();
	 	res.render('todo', {items: data});
	 } catch (err) {
	 	res.status(500).json(err.message);
	 }
});

app.post('/', urlEncodedParser, async (req, res) => {
	try {
		const newTodo = await Todo(req.body).save();
		res.status(201).json({message: "1 new task"});
	} catch (err) {
		res.status(400).json(err.message);
	}
});


app.delete('/todo/:item', async (req, res) => {
	try {
		const deleteTodo = new Todo({item: req.params.item.replace(/\-/g)}).find();
		await deleteTodo.deleteOne();
		res.status(200).json({message: "1 task removed"});
	} catch (err) {
		res.status(500).json(err.message);
	}
});

const [todo, setTodo] = useState("");

useEffect( () => {
	fetch('localhost:3000/api/todo')
	.then(res => res.json())
	.then(data => {
		setTodo(data);
	})
	.catch(err => console.log(err));
}, []);

const handleSubmit = async (e) => {
	e.preventDefault();

	const response = await fetch('localhost:3000/api/todo', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			task: task
		})
	});

	const data = await response.json();
}

const handleFileSubmit = async (e) => {
	e.preventDefault();

	const formData = new FormData();
	formData.append('file', selectedFile);

	const response = await fetch('localhost:3000/api/todo', {
		method: 'POST',
		body: formData
	})
	.then(res => res.text())
	.then(data => console.log(data));
}


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/uploads');
	},

	filename: function (req, file, cb) {
		cb(null, Date.now()+ "-" + file.originalname);
	}
});


const upload = multer({
	storage: storage
});

//OR

const upload = multer({
	storage,
	limits: {filesize: 2 * 1024 *1024},
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error("Only images are allowed"), false);
		}
	}
});

app.post('/upload', upload.single('file'), (req, res) => {
	console.log(req.file);
	console.log("File uploaded successfully");
});

app.post('/upload', upload.array('files', 5), urlEncodedParser, (req, res) => {
	console.log(req.files);
	console.log("Files were uploaded successfully");
});


import {useState} from 'react';

const MyForm = () => {
	const [formData, setFormData] = useState({
		file: null,
		category: "",
		location: ""
	});


	const handleChange = (e) => {
		const {name, value, files} = e.target;

		if (name === "file") {
			setFormData({...formData, file: files[0]});
		} else {
			setFormData({...formData, [name]: value});
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('file', formData.file);
		data.append('category', formData.category);
		data.append('location', formData.location);
	}
}


//Backend
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/uploads');
	},

	filename: (req, file, cb) => {
		cb(null, Date.now()+ "-" + file.originalname);
	}
});

const upload = multer({storage});

app.post('/upload', upload.single('file'), (req, res) => {
	const {category, location} = req.body;
	const file = req.file;

	res.json({message: "Request Submited.", data: {file, category, location}});
});




const [location, setLocation] = useState({lat: "", lng: ""});

navigator.geolocation.getCurrentPosition(
	(position) => {
		setLocation({
			lat: position.coords.latitude,
			lng: posotion.coords.longitude,
			accuracy: position.coords.accuracy
		});
	}, 

	(error) => {
		console.log(error);
	},

	{
		enableHighAccuracy: true,
		timeout: 10000,
		maximumAge: 0
	}
);

const [formData, setFormData] = useState({
	file: null,
	category: "",
	lat: "",
	lng: ""
});


const handleChange = (e) => {

	const {name, value, files} = e.target;

	if (name === "file") {
		setFormData({...formData, file: files[0]});
	} else {
		setFormData({...formData, [name]: value});
	}
}


const handleSubmit = async (e) => {
	e.preventDefault();

	const data = new FormData();
	data.append('file', formData.file);
	data.append('category', formData.category);
	data.append('lng', formData.lng);
	data.append('lat', formData.lat);

	try {
		const res = await fetch('http://localhost:3000/report', {
			method: 'POST',
			body: formData
		});

		const result = await res.json();
	} catch (error) {
		console.log(error);
	}
}


const multer = require('multer');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},

	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	}
});



//// ///// / ///////
const upload = multer({
	storage,
	limits: {filesize: 2 * 1024 * 1024},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/") {
			cb(null, true);
		} else {
			cb(new Error("Only image(s) are allowed"), false);
		}
	}
});



const upload = multer({storage});

app.post('/report', upload.single('file'), async (req, res) => {
	const {category, lat, lng} = req.body;
	const file = req.file;

	const newReport = {
		category,
		lat,
		lng,
		file
	}

	await res.json({message: "Request was submitted", data: newReport});

	try {
		const newReport = new Report(newReport);
		await newReport.save();
		
	}
});





//// ///// ///// /////


const Report = () => {

	const [location, setLocation] = useState({
		lat: "",
		lng: ""
	});



	navigator.geolocation.getCurrentPosition(
		(position) => {
			setLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				accuracy: position.coords.accuracy
			});
		},

		(error) => {
			console.log(error);
		},

		{
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0
		}
	);

	const [setForm, setFormData] = useState({
		file: null,
		category: "",
		lat: "",
		lng: ""
	});




	const handleChange = (e) => {
		const {name, value, files} = e.target;

		if (name === "file") {
			setFormData({...formData, file: files[0]});
		} else {
			setFormData({...formData, [name]: value});
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('file', formData.file);
		data.append('category', formData.category);
		data.append('lat', formData.lat);
		data.append('lng', formData.lng);

		try {
			const response = await fetch('http:localhost:5000/report', {
				method: 'POST',
				body: formData;
			});

			const result = await response.json();
		} catch (err) {
			console.log(err);
		}
	}
}
export default Report;


const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},

	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

const upload = multer({storage});

const upload = multer({
	storage,
	limits: {filename: 2 * 1024 * 1024},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'image/') {
			cb(null, true);
		} else {
			cb(new Error("Only images are allowed", false));
		}
	}
});

app.post('/report', upload.single('file'), async (req, res) => {
	const {category, lat, lng} = req.body;
	const file = req.file;

	const reportArray = {
		file,
		category,
		lat,
		lng
	}

	try {
		const newReport = new Report(reportArray);
		await newReport.save();

		res.status(201).json({message: "Report has been submited", data: newReport});
	} catch (err) {
		res.status(500).json({message: err});
	}
});

//Model

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user"
	}
});


module.exports = mongoose.model('User', userSchema);



//Register

const bcrypt = require('bcryptjs');

app.post('/register', async (req, res) => {
	const {name, email, password} = req.body;

	const hashedPassword = bcrypt.hash(password);


	const user = await User.create({
		name,
		email,
		password: hashedPassword
	});

	res.json(user);
});


//Login

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
	const {email, password} = req.body;

	const user = await User.findOne({email});

	if (!user) return res.status(404).json("User does not exist");

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) return res.status(400).json("Invalid login credentials");

	const token = jwt.sign(
		{id: user._id, role: user.role},
		process.env.JWT_SECRET,
		{expiresIn: "1d"}
	);

	res.json({ token });
});


//// //// //// ////
//Model

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	name: String,
	emai: String,
	password: String,
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user"
	}
});

module.exports = mongoose.model('User', userSchema);


//Register Controller
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

app.post('/register', async (req, res) => {
	const {name, email, password, confirm} = req.body;

	if (password !== confirm) return res.status(401).json({message: "Password mismatch"});

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: hashedPassword
	});

	res.status(200).json({user});
});

//Login Controller
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


app.post('/login', async (req, res) => {

	const {email, password} = req.body;

	const user = await User.findOne({ email });

	if (!user) return res.status(401).json({message: "User not found"});

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) return res.status(401).json({message: "Invalid login credentials"});

	const token = jwt.sign(
		{id: user._id, role: user.role},
		process.env.JWT_SECRET,
		{expiresIn: "1d"}
	);

	res.status(201).json({token});
});

module.exports = () => {

	//Multer image upload
	const multer = require('multer');

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/');
		},

		filename: (req, file, cb) => {
			cb(null, Date.now()+ "-" + file.originalname);
		}
	});

	const upload = multer({storage});

	//For more controll on files
	const upload = multer({
		storage,
		limits: {filesize: 2 * 1024 * 1024},
		fileFilter: (req, file, cb) => {
			if (file.mimetype === 'image/') {
				cb(null, true);
			} else {
				cb(new Error("Only images are allowed"), false);
			}
		}
	});

}



//Authentication Middleware
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) return res.status(401).json({message: "No token"});


	try {
		const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({message: "Invalid token"});
	}

}

module.exports = authMiddleware;


//Authorization Middleware
const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(401).json({message: "Access denied"});
		}
		next();
	};
}

module.exports = authorize;


//server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const reporterController = require('./controlers/reporterController');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend: false}));
app.use('uploads', express.static('/uploads'));

//Fire Register Controller
registerController(app);

//Fire Login Controller
loginController(app);

//Fire Reporter Controller
reporterController(app);


app.listen(5000, () => {console.log("Server running @ port 5000")});


//

import {useNavigation} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Reporter = () => {
	const navigate = useNavigation();

	const {formData, setFormData} = useState({
		file: null,
		category: "",
		lat: "",
		lng: ""
	});

	const {location, setLocation} = useState({});

	navigator.geolocation.getCurrentPosition(
		(position) => {
			setLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
		},

		(error) => {
			console.log(error);
		},

		{
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0
		}
	);

	const handleChange = (e) => {
		const {name, value, files} = e.target;

		if (name === "file") {
			setFormData({..formData, file: files[0]});
		} else {
			setFormData({...formData, [name]: value});
		}
	}

	const handleSubmit = async (e) {
		e.preventDefault();

		const data = new FormData();
		data.append('file', formData.file)
		data.append('category', formData.category);
		data.append('lng', location.lng);
		data.append('lat', location.lat);

		try {
			const response = await fetch('http://localhost:5000/report', {
				method: 'POST',
				body: data
			});

			const result = await response.json();
			console.log(result);

			if (res.ok) {
				localStorage("token", result.token);
				navigate('/dashboard');
			} else {
				console.log(result.message);
			}
		} catch (err) {
			console.err(err);
		}
	}
}
export default Reporter;





////////// / / // //////



module.exports = (app) => {

	app.get('/login', async (req, res) => {
		try {
			await res.json({message: "MERN STACK"});
		} catch(err) {
			res.status(500).json(err);
		}
	});

	app.post('/api/message', (req, res) => {	

		const storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, '/uploads');
			}, 

			filename: function (req, file, cb) {
				cb(null, Date.now()+ "-" + file.originalname);
			}
		});

		const upload = multer({storage: storage});

	});

	///////// ////// ////// //////

	//Connect to MongoDB
	//Set Schema, model, e.t.c
	//Retrieve from MongoDB
	//Insert into MongoDB
	//Delete From MongoDB
	//React.js api call useEffect
	//React.js submiting form both normal & filedata
	//Express storage setup for files
	//Express routing files
	//Express serve uploaded files

	const upload = multer({
		storage,
		limits: {fileSize: 2 * 1024 * 1024},
		fileFilter: function (req, file, cb) {
			if (file.mimetype.startsWith("images/")) {
				cb(null, true);
			} else {
				cb(new Error("Only images allowed"), false);
			}
		},
	});

	app.get('/todo', async (req, res) => {
		try {
			const todo = await Todo({}).find();
			res.render('todo', {items: todo});
		} catch (err) {
			res.status(500).json(err.message)
		}
	});

	app.post('/todo', urlEncodedParser, async (req, res) => {
		try {
			const newTodo = new Todo(req.body);
			await newTodo.save();

			res.render('todo', newTodo);
		} catch (err) {
			res.status(400).json(err.message);
		}
	});

	app.delete('/delete/:item', async (req, res) => {
		try {
			const deleteTodo = new Todo.find({item: req.params.item.replace(/\-/g)});
			await deleteTodo.deleteOne();
			res.status(201).json({message: "1 task deleted"});
		} catch (err) {
			res.status(400).json(err.message);
		}
	});

	mongoose.connect('db/url')
	.then( () => console.log("MongoDB Connected"));


	const todoSchema = new mongoose.Schema({
		item: String
	});


	const Todo = mongoose.model('Todo', todoSchema);

	const newTodo = new Todo({item: "Walk a dog"}).save();

	const response = await fetch('/api/message', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}, 
		body: JSON.stringify({
			task: task
		})
	});

	const data = await response.json();

	const formData = new FormData();
	formdata.append('file', selectedFile);

	const response = await fetch('localhost:3000/uploads', {
		method: 'POST',
		body: formData,
	})
	.then(res => res.text())
	.then(data => console.log(data));

	useEffect( () => {
		fecth('api/message')
		.then(res => res.json())
		.then(data => {
			setMessage(data);
		})
		.catch(err => console.log(err));
	}, []);

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, '/uploads');
		}, 

		filename: function (req, file, cb) {
			cb(null, Date.now()+ "-" + file.originalname);
		}
	});

	const upload = multer({storage: storage});

	app.post('/report', upload.single('file'), (req, res) => {
		console.log(req.file);
		console.log("File was uploaded successfully");
	});

	app.post('/report', upload.array('files', 5), (req, res) => {
		console.log(req.files);
		console.log("Files were uploaded successfully");
	});


}
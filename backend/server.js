require("dotenv").config();
const express =  require('express');
const cors = require('cors');
const reportController = require('./controllers/reportController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({
	origin: CLIENT_URL,
	methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(express.static('/public'));
app.use('/uploads', express.static('uploads'));

//Fire message controller
reportController(app);

//Fire Register Controller
registerController(app);

//Fire Login Controller
loginController(app);



const PORT = process.env.PORT;
app.listen(PORT, () => {console.log('Server running at port 5000')});
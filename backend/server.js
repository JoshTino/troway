require("dotenv").config();
const express =  require('express');
const cors = require('cors');
const reportController = require('./controllers/reportController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');

const app = express();

console.log("CLIENT_URL:", process.env.CLIENT_URL);

app.use(cors({
	origin: process.env.CLIENT_URL,
  	methods: ["GET", "POST", "PUT", "PATCH",  "DELETE", "OPTIONS"],
  	allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(express.static('/public'));
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("REAL BACKEND IS RUNNING");
});

//Fire message controller
reportController(app);

//Fire Register Controller
registerController(app);

//Fire Login Controller
loginController(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log('Server running at port 5000')});
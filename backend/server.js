require("dotenv").config();
const express =  require('express');
const cors = require('cors');
const reportController = require('./controllers/reportController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');

const app = express();

console.log("CLIENT_URL:", process.env.CLIENT_URL);

const allowedOrigins = [
  "http://localhost:5173",
  "https://troway1.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
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



app.listen(process.env.PORT, () => {console.log('Server running at port 5000')});
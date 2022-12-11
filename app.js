const express = require('express')
const web =require("./routes/web")
const app = express()
const port = 3000
const  cors = require('cors')
const api = require('./routes/api')
const session = require('express-session')
const flash = require('connect-flash');
//bodrpatser
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(cors())

const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
app.use(fileUpload({useTempFiles: true}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

//message
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));
  
  app.use(flash());

//Routing
app.use("/",web)

//api routing
app.use('/api',api)
//localhost:3000/api

// database connection
const connectdb = require('./db/connectdb')
connectdb()


//ejs set
app.set('view engine', 'ejs')


//static file setup
app.use(express.static('public'))


//server
app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})
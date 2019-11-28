const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')

const app = express()
const port = 3000

// app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());
app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
 }))


const addActivityRoute = require('./routes/activity.route.js')
// const addUserRoutes = require('./routes/user.route')

addActivityRoute(app);
// addUserRoutes(app);

app.listen(port, () => console.log(`Activities Backend is listening on port ${port}!`))
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')




const client = require('./config/connection')

const routes = require('./routes')
// const view_routes = require('./routes/view_routes')
// const user_routes = require('./routes/user_routes')
// const post_routes = require('./routes/post_routes')




// Create our server
const app = express();
const PORT = 3001;

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))



app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');

// Load/Setup Sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: new SequelizeStore({
        db: client,
      }),
      saveUninitialized: false,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
      cookie: {
        httypOnly: true // sends a secure cookie that cannot be accessed by broswer JS
      }
    })
  );

// Load in the routes
app.use('/', routes)

// Create a GET route for every file in public

// Start the server/Make the server listen for the client side requests.

client.sync({force:false})
    .then( () => {
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    })



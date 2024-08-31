const express = require('express');
const app = express();
const taskRoutes =  require("./routes/route.js");
var cors = require('cors');
var bodyParser = require('body-parser');


//connection to database
const connectToMongo = require('./config/db.js');
connectToMongo();

// connection to server
const port = process.env.PORT || 9000; // Using default 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// routes
// homepage route
app.get('/' , (req,res) =>{
  res.send('hello you are on homepage');
})


//middlewares and routes
app.use(cors());
app.options('*' , cors())
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));


app.use('/', require('./routes/route.js'));

/*app.use(express.json());
app.use(express.static('public')); // to acces img , css ;

app.set('view engine', 'ejs');
app.use('/', require('./routes/main.js')); */

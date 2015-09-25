// REQUIREMENTS //
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'))

// body parser config
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views','./public/views');
app.set('view engine', 'ejs');

// DATA //

// pre-seeded food data
var foods =[
  {id: 10, name: "Sushiritto", yumminess: "quite"},
  {id: 21, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 32, name: "Crayfish", yumminess: "depending"},
  {id: 43, name: "Foie Gras", yumminess: "omg"},
  {id: 54, name: "Kale", yumminess: "meh"}
]

// ROUTES //

// root path
app.get("/", function (req, res) {
  res.render('index')
  res.sendFile(path.join(__dirname + '/public/views/index.html'))
})

// foods index path
app.get("/foods", function (req, res) {
  res.json(foods);
})

app.post("/foods", function (req, res) {
  // add a unique id
  // add new food to DB (array, really...)
  // send a response with newly created object
  var id_arr = []
  Object.keys(foods).forEach(function(key) {
    id_arr.push(key);
  });
  var new_id = Math.max.apply(Math, id_arr) + 1;
  foods.push({id: new_id, name: 'arsesheet', yumminess: 'pickled'});
  res.json(foods);
})

app.delete("/foods/:id", function (req, res) {
  console.log("hitting delete route");
  // finding an object with id = req.body.id out of the foods
  // remove item from array
  // render deleted object
  var elementPos = foods.map(function(x) {return x.id; }).indexOf(32);
  foods.splice(elementPos,1);
  res.json(foods);
})

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000")
})
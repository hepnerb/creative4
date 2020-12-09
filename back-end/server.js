const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '/var/www/creativefour.brycehepner.bike/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/creativefour', {
  useNewUrlParser: true
});

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  description: String,
  path: String,
});
const bikeSchema = new mongoose.Schema({
  make: String,
  model: String,
  description: String,
  size: String,
  path: String,
});

// Create a model for items in the museum.
const Car = mongoose.model('Car', carSchema);
const Bike = mongoose.model('Bike', bikeSchema)

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/cars', async (req, res) => {
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await car.save();
    res.send(car);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.post('/api/bikes', async (req, res) => {
  const bike = new Bike({
    make: req.body.make,
    model: req.body.model,
    description: req.body.description,
    size: req.body.size,
    path: req.body.path,
  });
  try {
    await bike.save();
    res.send(bike);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/cars/:id', async (req, res) => {
  const car = await Car.findOne({_id: req.params.id});
  car.title = req.body.title,
  car.description = req.body.description
  try {
  await car.save();
  res.send(car);
  } catch (error) {
  console.log(error);
  res.sendStatus(500);
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  await Car.deleteOne({
    _id: req.params.id
  });
  try{
  res.sendStatus(200);
} catch (error) { 
  console.log(error);
  res.sendStatus(500);
}
});          

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});
// Get a list of all of the items in the museum.
app.get('/api/cars', async (req, res) => {
  try {
    let cars = await Car.find();
    res.send(cars);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

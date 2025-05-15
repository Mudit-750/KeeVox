const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb'); 
const cors = require('cors')

dotenv.config()

// Connecting to the MongoDB Client
const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(url);


// App & Database
const dbName = process.env.DB_NAME || "keevox"
const app =express()
const port = 3000

app.use(cors())
app.use(express.json());

client.connect();


// Get all the passwords
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  let findResult = await collection.find({}).toArray();
  res.json(findResult)
});

// Save a password
app.post('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  let insertPass = await collection.insertOne(password);
  res.send({success: true, result: insertPass})
});

// Delete a password
app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  let deletePass = await collection.deleteOne(password);
  console.log(deletePass)
  res.send({success: true, result: deletePass})
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

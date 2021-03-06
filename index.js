const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q9zoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log('Mongodb Connected');
    const taskCollection = client.db('ToDoList').collection('taskDetails');

    app.get('/todo', async (req, res) => {
      const todo = await taskCollection.find().toArray();
      res.send(todo);
    });

    app.post('/tasks', async (req, res) => {
      const todo = req.body;
      console.log(todo)
      const result = await taskCollection.insertOne(todo);
      res.send(result);
     
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('To-Do Server Running..');
});

app.listen(port, () => {
  console.log('To-Do Server Running..');
});
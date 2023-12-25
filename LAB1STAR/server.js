// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/writeToDatabase', async (req, res) => {
  try {
    const dataToWrite = req.body.data;

    // Подключение к базе данных
    const client = new MongoClient('mongodb://mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Запись данных в базу данных
    const db = client.db('mydatabase');
    await db.collection('mycollection').insertOne({ data: dataToWrite });

    // Закрытие соединения с базой данных
    await client.close();

    res.send('Data successfully written to the database');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

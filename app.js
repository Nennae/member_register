import express from 'express';
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// Skriv all annan kod här sen

app.listen(port, () => console.log(`Listening on ${port}`));

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('members');
const memberList = db.collection('users');

app.get('/users', async (req, res) => {
      const users = await memberList.find({name}).toArray();
      res.json(users);
});



// const express = require('express');
// const app = express();

// import { MongoClient } from 'mongodb';

// app.set('view engine', 'ejs');
// app.listen(3000);

// app.get('/', (req, res) => {
//       res.render('index');
// })

// app.get('/members', (req, res) => {
//       res.render('memebers');
// })

// app.get('/member', (req, res) => {
//       res.render('memeber');
// })

// app.get('/form', (req, res) => {
//       res.render('form');
// })

// app.use((req, res) => {
//       res.status(404).render('404');
// })
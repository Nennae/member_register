const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', (req, res) => {
      res.render('index');
})

app.get('/members', (req, res) => {
      res.render('memebers');
})

app.get('/member', (req, res) => {
      res.render('memeber');
})

app.get('/form', (req, res) => {
      res.render('form');
})

app.use((req, res) => {
      res.status(404).render('404');
})
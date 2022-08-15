import { MongoClient } from 'mongodb';
import express from 'express';

const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// Skriv all annan kod här sen
app.use(express.static('public'));

app.listen(port, () => console.log(`Listening on ${port}`));


const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('members');
const memberList = db.collection('users');

app.get('/users', async (req, res) => {
      const users = await memberList.find({}).toArray();
      res.json(users);
});

app.get('/members', async (req, res) => {
      const users = await memberList.find({}).toArray();
      res.render('members', {users, title: 'Members'});
});

app.get('/', (req, res) => {
      res.render('index', {title: 'Home'});
})

app.get('/form', (req, res) => {
      res.render('form', {title: 'Register'});
})

// app.get('/member', (req, res) => {
//       res.render('memeber');
// })


app.use((req, res) => {
      res.status(404).render('404');
})
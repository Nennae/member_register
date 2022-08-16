import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';

const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('secretClub');
const memberList = db.collection('members');


app.get('/', (req, res) => {
      res.render('index');
})

app.get('/members', async (req, res) => {
      const users = await memberList.find({}).toArray();
      res.render('members', {users});
});

app.get('/member/:id', async (req, res) => {
      const member = await memberList.findOne({ _id: ObjectId(req.params.id) });
      res.render('member', {
            name: member.name,
            mail: member.mail,
            phone: member.phone,
            createdAt: member.createdAt,
            secret: member.secret,
            id: member._id
      });
});

app.get('/member/:id/delete', async (req, res) => {
      await memberList.deleteOne({ _id: ObjectId(req.params.id) });
      res.redirect('/members');
});

app.get('/form', (req, res) => {
      res.render('form');
})

app.post('/members/form', async (req, res) => {
      await memberList.insertOne(req.body);
      res.redirect('/members');
});
app.get('/members/form', (req, res) => {
      res.render('form');
});

// app.use((req, res) => {
//       res.status(404).render('404');
// })

app.listen(port, () => console.log(`Listening on ${port}`));
import express from 'express';
import path from 'path';

const app = express();
import route from './routes/route.js';

// app.use(express.static("public")); //middleware in express

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/', route(express));

app.get('/register', (req,res) => {
    res.sendFile(path.resolve('views/register.html'));
});

app.get('/login', (req,res) => {
    res.sendFile(path.resolve('views/login.html'));
});

// app.use(checkAuthentication); //adding global auth middleware when we have many routes

app.get('/', (req,res) => { // adding auth middleware
   res.send('helllo');
});

app.listen(3001);
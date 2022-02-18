import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

let users = [];

const app = express();

// app.use(express.static("public")); //middleware in express
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = users.find(user => user.email === email);
    console.log(user, 'testtttttt');
    if (user === undefined) {
        return done(null, null, {message: 'Incorrect email'}); //first argument is error, second is user which is not found
    }

    if (await bcrypt.compare(password, user.password)) {
        console.log('success', '------');
        return done(null, user);
    }

    done(null, null, {message: 'Incorrect password'})
}));

passport.serializeUser((user, done) => { // from object we get text
    done(null, user.id);
});

passport.deserializeUser((id, done) => { // from id we get object
    done(null, users.find(user => user.id === id));
});

app.get('/register', (req,res) => {
    res.sendFile(path.resolve('views/register.html'));
});

app.get('/login', checkNotAuthentication, (req,res) => {
    res.sendFile(path.resolve('views/login.html'));
});

app.post('/register', checkNotAuthentication, async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 10);
    console.log(hashedPwd, 'hashhh');
    users.push({
        id: `${Date.now()}_${Math.random()}`,
        name,
        email,
        password: hashedPwd,
    });
    res.redirect('/login');
});

app.post('/login', passport.authenticate('local', { // first parameter is passport strategy
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.use(checkAuthentication); //adding global auth middleware when we have many routes

app.get('/', (req,res) => { // adding auth middleware
    res.sendFile(path.resolve('public/index.html'));
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated() === false) {
        return res.redirect('/login');
    }
    next();
}

function checkNotAuthentication(req, res, next) {
    if (req.isAuthenticated() === true) {
        return res.redirect('/');
    }
    next();
}




app.get('/bye', (req,res) => {
    res.send({
        name: 'joe',
    });
});

app.post('/hi', (req,res) => {
    // Getting data from the request
    // let data = '';
    // req.on('data', (info) => {
    //     data += info;
    // });
    // req.on('end', () => {
    //     const obj = JSON.parse(data);
    //     res.send("Everything is ok");
    //     console.log(obj.name);
    // })

    console.log(req.body.name);

    // res.send({
    //     name: "joe",
    // });
});

app.listen(process.env.MY_PORT);
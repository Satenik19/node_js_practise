import express from 'express';

const app = express();

app.use(express.static("public")); //middleware in express
app.use(express.json());

app.get('/', (req,res) => {
    res.redirect("/index.html");
});

app.get('/hello', (req,res) => {
    res.send("Hello");
});

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

app.listen(3001);
const express = require('express');
const path = require('path');
// const fs=require('fs');
const app = express();
const bodyparser = require('body-parser')
const port = 8000;

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    const contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String
    });

    const Contact = mongoose.model('Contact', contactSchema);

    // app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({
        extended: true
    }));

    app.use('/static', express.static('static'))
    app.use(express.urlencoded())

    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, 'views'))

    app.get('/', (req, res) => {
        const params = {}
        res.status(200).render('home.pug', params);
    })

    app.get('/contact', (req, res) => {
        const params = {}
        res.status(200).render('contact.pug', params);
    })
    app.post('/contact', (req, res) => {
        var myData = new Contact(req.body);
        myData.save().then(() => {
            res.send('Saved to the database')
        }).catch(() => {
            res.status(400).send('Not saved')
        });
        // res.status(200).render('contact.pug');
    })


    app.listen(port, () => {
        console.log(`Started successfully on port ${port}`);
    })
}



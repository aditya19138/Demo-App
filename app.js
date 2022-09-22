const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
        console.log("Database Connected !!")
    })
    .catch(err => {
        console.log("DB COnnection Error !!")
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'helloworld',
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 2,     //date is in ms and sessio will expire after 2 days
        maxAge: 1000 * 60 * 60 * 24 * 2
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log("Listening on port 3000 !!");
})


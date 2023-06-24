require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const { PAGE_URL, MONGO_URI } = require('./config');
const loginRouter = require('./controllers/login');
const contactsRouter = require('./controllers/contacts');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');

(async() => {
try {
    await mongoose.connect( MONGO_URI );
    console.log('Conectado a MongoDB');
} catch (error) {
    console.log(error);
}
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas Frontend

app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/contact', express.static(path.resolve('views', 'contact')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/img', express.static(path.resolve('views', 'img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));


app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/contacts', userExtractor, contactsRouter);

app.use(morgan('tiny'));

module.exports = app;
const PAGE_URL = process.env.NODE_ENV === 'production'
? 'https://contact-list-plch.onrender.com'
: 'http://localhost:3004';

const MONGO_URI = process.env.NODE_ENV === 'production'
? process.env.MONGO_URI_PROD
: process.env.MONGO_URI_DEV

module.exports = { PAGE_URL, MONGO_URI }
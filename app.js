const express = require('express');
const app = express();
const path = require("path");
// Built-in body parsing
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded payloads
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
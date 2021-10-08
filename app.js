// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();

const express = require('express');
const app = express(); //dddddd

const cors = require('cors');

const orderRoute = require('./routes/orderRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const authRoute = require('./routes/authRoute');
const errorController = require('./controller/errorController');
//////////////////////////////////////////////////////////

app.use(cors());
// create Table
app.use(express.json());

// use Route
// app.use('/create-order', orderRoute);
// app.use('/service-type-worker', orderRoute);
// app.use('/profile-orders', userRoute);
app.use('/profile', userRoute);
app.use('/sub-category', subCategoryRoute);
app.use('/category', categoryRoute);
app.use('/', authRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: 'resource not found on this server' });
});

app.use(errorController);
const port = process.env.PORT || 8099;
app.listen(port, () => console.log(`server running on port ${port}`));

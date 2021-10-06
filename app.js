// const { sequelize } = require('./models');
// sequelize.sync({ focus: true });

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const orderRoute = require('./routes/orderRoute');
const userRoute = require('./routes/userRoute');
//////////////////////////////////////////////////////////

app.use(cors());
// create Table
app.use(express.json());

// use Route
app.use('/create-order', orderRoute);
app.use('/', userRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: 'resource not found on this server' });
});

const port = process.env.PORT || 8099;
app.listen(port, () => console.log(`server running on port ${port}`));

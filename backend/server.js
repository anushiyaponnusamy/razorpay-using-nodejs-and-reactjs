const express = require("express");
const cors = require("cors")
const paymentRouter = require("./payment");
const subscriptionplansRouter = require("./subscriptionplans");

const app = express();
require('dotenv').config();

app.use(cors());
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json({ extended: false }));
app.use('/payment', paymentRouter)
app.use('/subscription', subscriptionplansRouter)
app.listen(port, () => console.log(`server started on port ${port}`));
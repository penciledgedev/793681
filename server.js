const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const bibleclub = require('./routes/userRoutes');
const referrer = require('./routes/referrerRoutes')
const admin = require('./routes/adminRoutes');
const oneDollar = require('./routes/oneDollarRoutes');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 5000
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
dotenv.config({ path: "./config.env" });

app.use(cors())
app.use(morgan('combined'));
// app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use('/api', bibleclub);
app.use('/api/referrer', referrer)
app.use("/api/admin", admin);
app.use("/api/one-dollar", oneDollar);

app.use(errorHandler);

 //catch unexpected exceptions
  process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION", ex);
  });

   //catch unhandled rejections
  process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN UNHANDLED REJECTION", ex);
  });
require("./config/db")

app.listen(PORT, console.log(`server is running on port ${PORT}, in ${process.env.NODE_ENV} mode`));
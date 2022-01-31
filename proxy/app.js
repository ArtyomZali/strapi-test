const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Api routes
app.use('/', require('./routes'));

const __PORT__ = 5000;
// Init server
app.listen(__PORT__, () => {
  console.log(`App is listening at :${__PORT__}`);
});

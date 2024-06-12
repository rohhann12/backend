const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const { UserRouter, functionalityRouter } = require('./routes/routes');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Applying auth middleware to all '/functionality' endpoints
app.use('/functionality', functionalityRouter);
// Use UserRoutes for '/user' endpoints without authentication
app.use('/user', UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
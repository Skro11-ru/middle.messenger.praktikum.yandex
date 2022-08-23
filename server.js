require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || PORT;
app.use(express.static(`${__dirname}/dist`));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/');
});

app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}!`);
});

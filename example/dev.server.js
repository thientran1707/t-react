const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = 8080;
const htmlFile = fs.readFileSync(path.join('dist', 'index.html'));

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.send(htmlFile.toString());
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));

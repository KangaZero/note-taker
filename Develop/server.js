const express = require('express');
const path = require('path');
const api = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)
app.use(express.static('public'));

//Not really needed as express.static method automatically gets index.html
//However it's good to be explicit!
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')));

  app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));
  


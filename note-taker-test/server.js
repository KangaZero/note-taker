const express = require('express');
const path = require('path');

// TODO api route

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//TODO app.use('/api', api)
app.use(express.static('public'));

//For explicity 
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
    );

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    );

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
    );
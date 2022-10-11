const express = require('express');
const { readFromFile, writeTofile, readAndAppend } = require('../helpers/fsUtils');

const note = express.Router();

note.get('/', (req, res) =>{
    console.info(`${req.method} request for note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


note.post('/', (req, res) => {
    //TODO: create middleware for console.info
    console.info(`${req.method} request for note`);

    const {title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');
        res.json("Note added!")
    } else {
        res.status(400).send("Error!")
    }
})

module.exports = note; 
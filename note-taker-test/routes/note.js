const note = require('express').Router();
const { readFromFile, writeTofile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

note.get('/', (req, res) =>{
    console.info(`${req.method} request for note`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});


note.post('/', (req, res) => {
    //TODO: create middleware for console.info
    console.info(`${req.method} request for note`);

    const {title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, '../db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response)
    } else {
        res.status(400).send("Error!")
    }
});
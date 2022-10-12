const express = require('express');
const fs = require('fs');
//helpers
const { readFromFile, writeTofile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
//Router name
const note = express.Router();

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

note.delete('/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            throw err;
        } else {
            currentData = JSON.parse(data)
            //TODO def need to fix this up
            //filter and return objects without id of request
            for (let i = 0; i <  currentData.length; i++) {
                //currentData.filter(() => currentData[i].id != id)
                if (currentData[i].id == id) {
                    currentData.splice(currentData[i].id)
                   writeTofile('../db/db.json', currentData);
                }  
            }      
        }
    });
});

module.exports = note; 


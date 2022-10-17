const express = require('express');
const fs = require('fs');
const path = require('path');
//helpers
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const apiData = require('../db/db.json')
//Router name
const note = express.Router();

note.get('/', (req, res) => {
    console.info(`${req.method} request for note`);
    readFromFile(path.join(__dirname, '../db/db.json'))
        .then((data) => {
        res.json(JSON.parse(data));
     
        for (let i = 0; i < JSON.parse(data).length; i++) {
            console.log((JSON.parse(data))[i].id)
        }
    
    })
});

note.get('/id/:id', (req, res) => {
    const id = req.params.id;
    
    console.info(`${req.method} request for id: ${id}`);

    // https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
    const findId = apiData.filter((elem) => elem.id == id)
    console.log(findId)
    if(findId){
        return res.json(findId)
    } else {
        return res.status(400).send("Id not found!")
    }

            // for (let i = 0; i < apiData.length; i++) {
            //     console.log(apiData.length, req.params.id, apiData[i].id)
            //         // console.log(apiData[])
            //     if (req.params.id === apiData[i].id){
            //       return res.json(apiData[i]);
            //     } 
            //     else {
            //         return res.status(400).send("id not found!")
            //     }
                
            // };

    });
// });

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

        readAndAppend(newNote, (path.join(__dirname, '../db/db.json')));

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response)
    } else {
        res.status(500).send("Error!")
    }
});

note.delete('/id/:id', (req, res) => {
    const id = req.params.id;
    console.info(`${req.method} request for note for id: ${id}`);
    const removeId = apiData.filter((elem) => elem.id !== id)
    console.log(removeId)

    writeToFile((path.join(__dirname, '../db/db.json')), removeId)
    
});




module.exports = note; 

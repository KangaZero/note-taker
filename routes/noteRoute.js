const express = require('express');
const fs = require('fs');
const path = require('path');
//helpers
const { readFromFile, writeTofile, readAndAppend } = require('../helpers/fsUtils');
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

    const findId = apiData.filter( (elem) => elem.id == id)
    res.json(findId)
    // readFromFile(path.join(__dirname, '../db/db.json'))
    //     .then((data) => {
            // const parsedData = JSON.parse(data)
            // console.log(parsedData.length)
            // res.json(parsedData)

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

note.delete('/:id', (req, res) => {
    
    readFromFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            throw err;
        } else {
            const id = req.params.id;
            const currentData = JSON.parse(data)
            const newData = []

            let removeCurrentData = currentData.map(() =>{
                if (currentData.id != id){
                    newData.push[currentData]
                }
            }) 
            removeCurrentData();

            writeTofile(newData, (path.join(__dirname, '../db/db.json')));
        }
    });
});

module.exports = note; 

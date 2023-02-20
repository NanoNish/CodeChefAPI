// const express = require('express');
import express from 'express';

// problem = require('./problem');
import problem from './problem.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hey There!!!');
})

app.get('/problem/:problemId', async (req, res) => {
    var problemStatement = await problem(req.params.problemId);
    res.send(problemStatement);
})

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
})
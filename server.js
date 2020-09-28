const express = require('express');
const fs = require('fs');
const app = express();

const history = require('./history.json') || [];

app.get('/', (req, res) => {
    res.send(
      fs.readFileSync('index.html', {encoding: 'utf-8'})
    );
});

app.get('/create-message', (req, res) => {
    history.push(req.query);
    fs.writeFileSync('./history.json', JSON.stringify(history,{encoding: 'utf-8'}))
    res.send(history);
});

app.get('/display-messages', (req, res) => {
    res.send(history);
});

app.get('/clear-history', (req, res) => {
    history.splice(0,history.length);
    fs.writeFileSync('./history.json', JSON.stringify(history,{encoding: 'utf-8'}));
    res.send(history);
});

app.listen(8080);
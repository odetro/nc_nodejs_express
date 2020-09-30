const express = require('express');
const fs = require('fs');
const app = express();

const history = require('./history.json') || [];

function saveHistory(history) {
    fs.writeFileSync('./history.json', JSON.stringify(history,{encoding: 'utf-8'}))
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send(
      fs.readFileSync('index.html', {encoding: 'utf-8'})
    );
});

app.post('/create-message', (req, res) => {
    history.push(req.body);
    saveHistory(history)
    res.send(history);
});

app.get('/messages', (req, res) => {
    res.send(history);
});

app.delete('/messages', (req, res) => {
    history.splice(0,history.length);
    saveHistory(history)
    res.send(history);
});

app.listen(8080);
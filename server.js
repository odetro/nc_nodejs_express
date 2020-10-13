const express = require('express');
const fs = require('fs');
const app = express();

const history = require('./history.json') || [];
let uuid = (parseFloat(Math.random()).toPrecision(5)) * 1000000;

function saveHistory(history) {
    fs.writeFileSync('./history.json', JSON.stringify(history,{encoding: 'utf-8'}))
}

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(
      fs.readFileSync('index.html', {encoding: 'utf-8'})
    );
});

app.post('/messages', (req, res) => { //create new
    history.push({
        id: uuid,
        ...req.body
    });
    uuid+=1;
    saveHistory(history)
    res.send(history);
});

app.put('/messages/:id', (req, res) => { //replace a message
    let newMessage = req.body.message;
    for (let i=0 ; i<history.length ; i++)  {
        if (req.params.id == history[i].id) {
            history[i].message = newMessage;
        }
    };
    saveHistory(history);
    res.send(history);
});

app.delete('/messages/:id', (req, res) => { //delete a message
    for (let i=0 ; i<history.length ; i++)  {
        if (req.params.id == history[i].id) {
            history.splice(i,1);
        }
    };
    saveHistory(history);
    res.send(history);
});

app.get('/messages', (req, res) => { //read message
    res.send(history);
});

app.delete('/messages', (req, res) => { //delete all
    history.splice(0,history.length);
    saveHistory(history)
    res.send(history);
});

app.listen(8080);
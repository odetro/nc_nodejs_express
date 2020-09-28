const express = require('express');
const app = express();

app.get('/:text', (req, res) => {
    res.send(`<h1>${req.params.text}</h1>`);
});


app.listen(8080);
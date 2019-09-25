const express = require('express');
const morgan = require('morgan');

let dataSet = require('./appStore');

const app = express();
app.use(morgan('common'));


const genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

app.get('/apps', (req, res) => {

    const { sort, genre } = req.query;

    if (sort) {
        if (!['App', 'Rating'].includes(sort)) {
            return res
                .status(400)
                .json({ error: 'something went wrong' })
        } else {
            let sortNum;
            if (sort === 'App') {
                sortNum = 1;
            } else {
                sortNum = -1;
            }
            dataSet.sort((a, b) => {
                return a[sort] > b[sort] ? sortNum : sortNum * -1;
            })
        }
    }

    if (genre) {
        dataSet = dataSet.filter(app => {
            return app["Genres"].toLowerCase().includes(genre.toLowerCase())
        })
    }

    res.json(dataSet);
})

module.exports = app;
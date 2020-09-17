const express = require('express');
const db = require('../../data/dbConfig.js')
const router = express.Router();

router.get('/', (req, res) => {
    db.raw('SELECT * from accounts')
    .then(accts => {
        res.json(accts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'database error', error: err})
    })
})

module.exports = router;
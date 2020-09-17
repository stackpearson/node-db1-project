const express = require('express');
const db = require('../../data/dbConfig.js')
const router = express.Router();


//get all accounts
router.get('/', (req, res) => {
    // db.raw('SELECT * from accounts')
    db('accounts')
    .then(accts => {
        res.json(accts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'database error', error: err})
    })
})

//get account by id
router.get('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})

    .then(accts => {
        res.status(200).json(accts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'database error', error: err})
    })
})

//create new account
router.post('/', (req, res) => {
    const newAcct = req.body;

    db('accounts').insert(newAcct)
    .then(newPost => {
        res.status(200).json(newPost)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'database error', error: err})
    })
})

//edit account by id
router.put('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params;

    const verifiedChange = db('accounts').update(changes).where({id})
    .then(edits => {
        if (verifiedChange) {
            res.status(200).json({updated: verifiedChange})
        } else {
            res.status(404).json({message: 'account does not exist'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'database error', error: err})
    })
})

//delete account by id
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    const acctToDelete = db('accounts').where({id}).del()

    .then(acct => {
        if (acctToDelete) {
            res.status(200).json({deleted: acctToDelete})
        } else {
            res.status(404).json({message: 'account does not exist'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'database error', error: err})
    })
})

module.exports = router;
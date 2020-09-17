const express = require('express');
const db = require('../../data/dbConfig.js')
const router = express.Router();


//get all accounts
router.get('/', (req, res) => {
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
router.get('/:id', async (req, res) => { 
    try {
        const [existingAcct] = await db('accounts').where({id: req.params.id})

        if (existingAcct) {
            res.json(existingAcct)
        } else {
            res.status(404).json({message: 'account does not exist'})
        }
    } catch (err) {
        res.status(500).json({message: 'database error', error: err})
    } 
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
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    try {
        const verifiedChange = await db('accounts').update(changes).where({id});

        if (verifiedChange) {
            res.json({updated: verifiedChange});
            console.log(error)
        } else {
            res.status(404).json({message: 'Account does not exist'})
        }
        
    } catch (err) {
        res.status(500).json({message: 'database error', error: err})
        console.log(err)
    }
});

//delete account by id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const acctToDelete = await db('accounts').where({id}).del()

        if (acctToDelete) {
            res.json({deleted: acctToDelete});
        } else {
            res.status(404).json({message: 'Account does not exist'})
        }
        
    } catch (err) {
        res.status(500).json({message: 'database error', error: err})
        console.log(err)
    }
});

module.exports = router;
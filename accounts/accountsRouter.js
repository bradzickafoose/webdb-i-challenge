const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving accounts", reason: error.message });
  }
})

router.get('/:id', (req, res) => {
    db
        .select('*')
        .from('accounts')
        .where({ id: req.params.id })
        .first()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    db
        .insert(req.body, 'id')
        .into('accounts')
        .then(added => {
            res.status(200).json(added)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(remove => {
            res.status(200).json(remove)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.put('/:id', (req, res) => {
    const postContent = req.body;

    db('accounts')
        .where({ id: req.params.id })
        .update(postContent)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;
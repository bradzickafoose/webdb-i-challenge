const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// READ all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving accounts", reason: error.message });
  }
})

// READ Account by ID
router.get('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving account by ID", reason: error.message });
  }
})

// CREATE Account
router.post('/', async (req, res) => {
  const accountData = req.body;

  try {
    if (!accountData.name || !accountData.budget) {
      res.status(400).json({ error: "Please fill out all required fields" });
    }
    else {
      const account = await db('accounts').insert(accountData);
      res.status(201).json({ message: "Account added", id: account });
    }
  } catch (error) {
      res.status(500).json({ error: "Error creating account", reason: error.message })
  }
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
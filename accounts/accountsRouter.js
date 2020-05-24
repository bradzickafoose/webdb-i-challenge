const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// CREATE account
router.post('/', async (req, res) => {
  const accountData = req.body;

  try {
    if (!accountData.name || !accountData.budget) {
      res.status(400).json({ error: "Please fill out all required fields" });
    }
    else {
      const account = await db('accounts').insert(accountData);
      res.status(201).json({ message: `The account for ${accountData.name} has been added`, id: account });
    }
  } catch (error) {
      res.status(500).json({ error: "Error creating account", reason: error.message });
  }
})

// READ all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving accounts", reason: error.message });
  }
})

// READ account by ID
router.get('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving account by ID", reason: error.message });
  }
})

// UPDATE account by ID
router.put('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id }).update(req.body);
    res.status(200).json({ message: "Account updated", id: account });
  } catch (error) {
    res.status(500).json({ message: "Error updating account", reason: error.message });
  }
})

// DELETE account by ID
router.delete('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id }).del();
    res.status(200).json({ message: "Account deleted", id: account });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", reason: error.message });
  }
})

module.exports = router;
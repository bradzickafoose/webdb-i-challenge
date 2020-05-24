const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// CREATE account
router.post('/', validateBody, async (req, res) => {
  const account = req.body;

  try {
    await db('accounts').insert(account);
    res.status(201).json({ message: `An account for ${account.name} has been created.`, account });
  }
  catch (error) {
    res.status(500).json({ message: "Error creating account.", reason: error.message });
  }
})

// READ all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  }
  catch (error) {
    res.status(500).json({ message: "Error retrieving accounts.", reason: error.message });
  }
})

// READ account by ID
router.get('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id });
    res.status(200).json(account);
  }
  catch (error) {
    res.status(500).json({ message: "Error retrieving account by ID.", reason: error.message });
  }
})

// UPDATE account by ID
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const account = req.body;

  try {
    await db('accounts').where({ id }).update(account);
    res.status(200).json({ message: `The account for ${account.name} has been updated.`, id, account });
  }
  catch (error) {
    res.status(500).json({ message: "Error updating account.", reason: error.message });
  }
})

// DELETE account by ID
router.delete('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id }).del();
    res.status(200).json({ message: "Account deleted.", id: account });
  }
  catch (error) {
    res.status(500).json({ message: "Error deleting account.", reason: error.message });
  }
})

// MIDDLEWARE: Validate request body conditions
function validateBody(req, res, next) {
  const account = req.body;

  // Check the required account name and budget is in the request body
  if (!account.name && !account.budget) {
    res.status(400).json({ message: "Please include an account name and budget." })
  }
  // Check the required account name is in request body
  else if (!account.name) {
    res.status(400).json({ message: "Please include account name." });
  }
  // Check if the required account budget is in request body
  else if (!account.budget) {
    res.status(400).json({ message: "Please include account budget."})
  }
  // All checks pass, continue
  else {
    next();
  }
}

module.exports = router;
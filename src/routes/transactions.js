// src/routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactions');
const { verifyToken } = require('../middleware/auth');

// Get all transactions
router.get('/', verifyToken, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new transaction
router.post('/', verifyToken, async (req, res) => {
    const transaction = new Transaction({
        userId: req.user.id,
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
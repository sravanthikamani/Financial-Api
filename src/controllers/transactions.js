const db = require('../config/db');

exports.createTransaction = (req, res) => {
    db.serialize(() => {  // Use db.serialize to ensure connection
      const { type, category, amount, date, description } = req.body;
      const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
      db.run(query, [type, category, amount, date, description], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
      });
    });
  };

// Get all transactions
exports.getAllTransactions = (req, res) => {
  db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ transactions: rows });
  });
};

// Get a transaction by ID
exports.getTransactionById = (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Transaction not found' });
    res.json(row);
  });
};

// Update a transaction by ID
exports.updateTransaction = (req, res) => {
  const id = req.params.id;
  const { type, category, amount, date, description } = req.body;
  const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
  db.run(query, [type, category, amount, date, description, id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ updatedID: id });
  });
};

// Delete a transaction by ID
exports.deleteTransaction = (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: id });
  });
};

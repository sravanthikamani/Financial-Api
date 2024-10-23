const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite3'); // Initialize db here

// Get summary of income, expenses, and balance
exports.getSummary = (req, res) => {
  db.serialize(() => { // Use db.serialize to ensure connection
    const { startDate, endDate } = req.query;

    let query = `SELECT type, SUM(amount) as total FROM transactions`;
    const params = [];

    if (startDate && endDate) {
      query += ` WHERE date BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    query += ` GROUP BY type`;

    db.all(query, params, (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });

      const summary = {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
      };

      rows.forEach(row => {
        if (row.type === 'income') summary.totalIncome = row.total;
        if (row.type === 'expense') summary.totalExpenses = row.total;
      });

      summary.balance = summary.totalIncome - summary.totalExpenses;

      res.json(summary);
    }); 
  });
};
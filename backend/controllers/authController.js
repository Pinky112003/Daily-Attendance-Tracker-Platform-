const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM employees WHERE username = ?',
        [username],
        (err, results) => {
            if (err) return res.status(500).send('Server error');
            if (results.length === 0) return res.status(401).send('Invalid credentials');
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(500).send('Server error');
                if (!isMatch) return res.status(401).send('Invalid credentials');
                req.session.user = user;
                db.query('INSERT INTO login_logs (employee_id) VALUES (?)', [user.id], (err) => {
                    if (err) console.log('Error logging login');
                });
                res.json({ success: true, user });
            });
        }
    );
};

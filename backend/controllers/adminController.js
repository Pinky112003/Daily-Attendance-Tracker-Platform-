const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.addEmployee = (req, res) => {
    const { name, department, joining_date, username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');
        db.query(
            'INSERT INTO employees (name, department, joining_date, username, password) VALUES (?, ?, ?, ?, ?)',
            [name, department, joining_date, username, hashedPassword],
            (err) => {
                if (err) return res.status(500).send('Error adding employee');
                res.json({ message: 'Employee added successfully' });
            }
        );
    });
};

exports.getReport = (req, res) => {
    db.query(
        'SELECT e.name, a.status, a.timestamp FROM attendance a JOIN employees e ON a.employee_id = e.id ORDER BY a.timestamp DESC',
        (err, results) => {
            if (err) return res.status(500).send('Error fetching report');
            res.json(results);
        }
    );
};

exports.sendNotification = (req, res) => {
    const { employee_id, message } = req.body;
    db.query(
        'INSERT INTO notifications (employee_id, message) VALUES (?, ?)',
        [employee_id, message],
        (err) => {
            if (err) return res.status(500).send('Error sending notification');
            res.json({ message: 'Notification sent successfully' });
        }
    );
};

exports.sendBulkNotification = (req, res) => {
    const { message } = req.body;
    db.query(
        'INSERT INTO notifications (employee_id, message) SELECT id, ? FROM employees',
        [message],
        (err) => {
            if (err) return res.status(500).send('Error sending bulk notifications');
            res.json({ message: 'Bulk notifications sent successfully' });
        }
    );
};

exports.getEmployees = (req, res) => {
    db.query('SELECT id, name, department, joining_date, username FROM employees', (err, results) => {
        if (err) return res.status(500).send('Error fetching employees');
        res.json(results);
    });
};

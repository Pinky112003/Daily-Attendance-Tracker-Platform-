const db = require('../config/db');

exports.markAttendance = (req, res) => {
    const { status } = req.body;
    const employee_id = req.session.user.id;
    db.query(
        'INSERT INTO attendance (employee_id, status) VALUES (?, ?)',
        [employee_id, status],
        (err) => {
            if (err) return res.status(500).send('Error marking attendance');
            res.json({ message: 'Attendance marked successfully' });
        }
    );
};

exports.getHistory = (req, res) => {
    const employee_id = req.session.user.id;
    db.query(
        'SELECT * FROM attendance WHERE employee_id = ? ORDER BY timestamp DESC',
        [employee_id],
        (err, results) => {
            if (err) return res.status(500).send('Error fetching history');
            res.json(results);
        }
    );
};

exports.getLoginLogs = (req, res) => {
    const employee_id = req.session.user.id;
    db.query('SELECT * FROM login_logs WHERE employee_id = ? ORDER BY login_time DESC', [employee_id], (err, results) => {
        if (err) return res.status(500).send('Error fetching login logs');
        res.json(results);
    });
};

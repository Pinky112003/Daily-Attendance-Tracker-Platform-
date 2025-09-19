const db = require('../config/db');

const Attendance = {
    mark: (employee_id, status, callback) => {
        db.query(
            'INSERT INTO attendance (employee_id, status) VALUES (?, ?)',
            [employee_id, status],
            callback
        );
    },
    history: (employee_id, callback) => {
        db.query(
            'SELECT * FROM attendance WHERE employee_id = ? ORDER BY timestamp DESC',
            [employee_id],
            callback
        );
    },
    report: (callback) => {
        db.query(
            'SELECT e.name, a.status, a.timestamp FROM attendance a JOIN employees e ON a.employee_id = e.id ORDER BY a.timestamp DESC',
            callback
        );
    }
};

module.exports = Attendance;
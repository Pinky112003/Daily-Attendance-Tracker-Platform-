const db = require('../config/db');

const Employee = {
    findByCredentials: (username, password, callback) => {
        db.query(
            'SELECT * FROM employees WHERE username = ? AND password = ?',
            [username, password],
            callback
        );
    },
    add: (name, department, joining_date, username, password, callback) => {
        db.query(
            'INSERT INTO employees (name, department, joining_date, username, password) VALUES (?, ?, ?, ?, ?)',
            [name, department, joining_date, username, password],
            callback
        );
    },
    findAll: (callback) => {
        db.query(
            'SELECT * FROM employees',
            callback
        );
    }
};

module.exports = Employee;
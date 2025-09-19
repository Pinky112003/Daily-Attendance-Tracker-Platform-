// Example: Login
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.username.value,
            password: this.password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            if (data.user.is_admin) {
                window.location.href = '/admin.html';
            } else {
                window.location.href = '/dashboard.html';
            }
        } else {
            alert('Login failed');
        }
    });
    
});

// Example: Mark Attendance
function markAttendance(status) {
    fetch('/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadAttendanceHistory();
    });
}

// Example: Load Attendance History
function loadAttendanceHistory() {
    fetch('/attendance/history')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('attendance-table');
            table.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.status}</td><td>${row.timestamp}</td>`;
                table.appendChild(tr);
            });
        });
}

// Admin: Add Employee
document.getElementById('add-employee-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/admin/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: this.name.value,
            department: this.department.value,
            joining_date: this.joining_date.value,
            username: this.username.value,
            password: this.password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadEmployees();
    });
});

// Admin: Load Report
function loadReport() {
    fetch('/admin/report')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('report-table');
            table.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.name}</td><td>${row.status}</td><td>${row.timestamp}</td>`;
                table.appendChild(tr);
            });
        });
}

// Load report on admin page load
if (document.getElementById('report-table')) {
    loadReport();
}

// Load Employees
function loadEmployees() {
    fetch('/admin/employees')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('employees-table');
            table.innerHTML = '<tr><th>ID</th><th>Name</th><th>Department</th><th>Joining Date</th><th>Username</th></tr>';
            data.forEach(employee => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${employee.id}</td><td>${employee.name}</td><td>${employee.department}</td><td>${employee.joining_date}</td><td>${employee.username}</td>`;
                table.appendChild(tr);
            });
        });
}

// Load employees on admin page load
if (document.getElementById('employees-table')) {
    loadEmployees();
}

// Load Login Logs
function loadLoginLogs() {
    fetch('/attendance/login-logs')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('login-logs-table');
            table.innerHTML = '<tr><th>Login Time</th></tr>';
            data.forEach(log => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${log.login_time}</td>`;
                table.appendChild(tr);
            });
        });
}

// Load login logs on dashboard page load
if (document.getElementById('login-logs-table')) {
    loadLoginLogs();
}

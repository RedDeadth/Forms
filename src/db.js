import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Default XAMPP user
    password: '', // Default XAMPP empty password
    database: 'kpi_db', // Database we will create
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

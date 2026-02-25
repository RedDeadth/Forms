import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Default XAMPP user
    password: '', // Default XAMPP empty password
    database: 'viviendas_db', // New Database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

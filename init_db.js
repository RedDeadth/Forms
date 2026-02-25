import mysql from 'mysql2/promise';

async function init() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '' // XAMPP default
    });

    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS kpi_db');
        await connection.query('USE kpi_db');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS evaluaciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombres VARCHAR(255),
                organizacion VARCHAR(255),
                tipo_gestion VARCHAR(50),
                fecha DATE,
                v2_1 DECIMAL(10,2),
                v2_2 DECIMAL(10,2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database and table initialized successfully for XAMPP.');
    } catch (error) {
        console.error('Failed to init DB:', error);
    } finally {
        await connection.end();
    }
}

init();

import mysql from 'mysql2/promise';

async function init() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '' // XAMPP default
    });

    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS kpi_docente_db');
        await connection.query('USE kpi_docente_db');
        
        await connection.query('DROP TABLE IF EXISTS respuestas');

        await connection.query(`
            CREATE TABLE respuestas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                encuestado_nombre VARCHAR(150),
                respuestas_json JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Base de datos kpi_docente_db y tabla respuestas creadas exitosamente.');
    } catch (error) {
        console.error('Error al inicializar la DB:', error);
    } finally {
        await connection.end();
    }
}

init();

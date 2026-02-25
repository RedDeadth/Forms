import mysql from 'mysql2/promise';

async function init() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '' // XAMPP default
    });

    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS viviendas_db');
        await connection.query('USE viviendas_db');
        
        await connection.query('DROP TABLE IF EXISTS evaluaciones');
        await connection.query('DROP TABLE IF EXISTS inspecciones');

        await connection.query(`
            CREATE TABLE inspecciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                inspector_nombre VARCHAR(150),
                
                tipo_vivienda VARCHAR(100),
                plantas VARCHAR(10),
                zona_construccion VARCHAR(50),
                fecha VARCHAR(50),
                pais VARCHAR(100),
                region VARCHAR(100),
                provincia VARCHAR(100),
                grado_estudios VARCHAR(100),
                
                score_electrico INT DEFAULT 0,
                score_incendio INT DEFAULT 0,
                score_caidas INT DEFAULT 0,
                score_humedad INT DEFAULT 0,
                score_estructural INT DEFAULT 0,
                score_salud INT DEFAULT 0,
                score_infantil INT DEFAULT 0,
                score_total INT DEFAULT 0,
                nivel_riesgo VARCHAR(50),
                respuestas_json JSON,
                
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database and inspecciones table initialized successfully.');
    } catch (error) {
        console.error('Failed to init DB:', error);
    } finally {
        await connection.end();
    }
}

init();

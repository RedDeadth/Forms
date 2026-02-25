import mysql from 'mysql2/promise';

async function init() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '' // XAMPP default
    });

    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS ludopatia_db');
        await connection.query('USE ludopatia_db');
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS evaluaciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                
                /* Sección 1 - Evaluador */
                evaluador_nombre VARCHAR(150),
                fecha VARCHAR(50),
                pais VARCHAR(100),
                region VARCHAR(100),
                provincia VARCHAR(100),
                grado_estudios_evaluador VARCHAR(100),
                
                /* Sección 2 - Evaluado */
                sexo VARCHAR(20),
                edad INT,
                grado_instruccion VARCHAR(100),
                tipo_trabajo VARCHAR(100),
                nivel_socioeconomico VARCHAR(10),
                
                /* Scores por categoría */
                score_conducta INT DEFAULT 0,
                score_emocional INT DEFAULT 0,
                score_economico INT DEFAULT 0,
                score_relaciones INT DEFAULT 0,
                score_control INT DEFAULT 0,
                score_total INT DEFAULT 0,
                nivel_riesgo VARCHAR(50),
                
                /* Respuestas detalladas */
                respuestas_json JSON,
                
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Base de datos ludopatia_db y tabla evaluaciones creadas exitosamente.');
    } catch (error) {
        console.error('Error al inicializar la DB:', error);
    } finally {
        await connection.end();
    }
}

init();

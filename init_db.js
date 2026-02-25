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
        
        // Drop old table if exists from the incorrect previous run
        await connection.query('DROP TABLE IF EXISTS evaluaciones');
        await connection.query('DROP TABLE IF EXISTS inspecciones');

        await connection.query(`
            CREATE TABLE inspecciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                inspector_nombre VARCHAR(150),
                
                tipo_vivienda VARCHAR(100),
                pisos VARCHAR(10),
                area_construccion DECIMAL(10,2),
                sector VARCHAR(255),
                pais VARCHAR(100),
                region VARCHAR(100),
                provincia VARCHAR(100),
                
                conoce_edad VARCHAR(50),
                tiene_licencia VARCHAR(50),
                numero_licencia VARCHAR(100),
                pago_mano_obra VARCHAR(100),
                tiene_planos VARCHAR(50),
                autor_planos VARCHAR(255),
                cuenta_asistencia VARCHAR(50),
                nombre_profesional VARCHAR(255),
                
                danos_vivienda VARCHAR(50),
                ubicacion_dano VARCHAR(100),
                tipo_dano VARCHAR(100),
                
                severidad_sismo VARCHAR(50),
                
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database and inspecciones table initialized successfully for XAMPP.');
    } catch (error) {
        console.error('Failed to init DB:', error);
    } finally {
        await connection.end();
    }
}

init();

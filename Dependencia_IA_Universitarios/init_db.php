<?php
/**
 * Script de inicialización de la base de datos.
 * Ejecutar una vez: php init_db.php
 * 
 * Cambia los valores de conexión según tu hosting (ntchosting).
 */

$host = 'localhost';
$user = 'root';
$pass = '';
$dbName = 'dependencia_ia_db';

try {
    // Conectar sin DB
    $pdo = new PDO("mysql:host=$host", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // Crear DB
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName`");
    $pdo->exec("USE `$dbName`");

    // Crear tabla
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS evaluaciones_ia (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombres VARCHAR(150),
            apellidos VARCHAR(150),
            correo VARCHAR(150),
            whatsapp VARCHAR(50),
            semestre VARCHAR(50),
            programa_estudios VARCHAR(150),
            universidad VARCHAR(150),
            pais VARCHAR(100),
            region VARCHAR(100),
            provincia VARCHAR(100),
            
            -- Respuestas (1 a 23)
            q1 INT, q2 INT, q3 INT, q4 INT, q5 INT,
            q6 INT, q7 INT, q8 INT, q9 INT, q10 INT,
            q11 INT, q12 INT, q13 INT, q14 INT, q15 INT,
            q16 INT, q17 INT, q18 INT, q19 INT,
            q20 INT, q21 INT, q22 INT, q23 INT,

            -- Scores
            score_cognitiva INT,
            score_sobreconfianza INT,
            score_sustitucion INT,
            score_compulsivo INT,
            score_etico INT,
            score_total INT,
            
            -- Resultados
            nivel_dependencia VARCHAR(100),
            diagnostico VARCHAR(200),
            idia_porcentaje DECIMAL(5,2),
            idia_nivel VARCHAR(100),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    echo "✅ Base de datos '$dbName' y tabla 'evaluaciones_ia' creadas exitosamente.\n";

} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}

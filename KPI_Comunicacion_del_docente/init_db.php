<?php
$host='localhost'; $user='root'; $pass=''; $dbName='kpi_docente_db';
try {
    $pdo = new PDO("mysql:host=$host", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName`");
    $pdo->exec("USE `$dbName`");
    $pdo->exec("CREATE TABLE IF NOT EXISTS evaluaciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        encuestado_nombre VARCHAR(150), institucion_educativa VARCHAR(150),
        tipo_gestion VARCHAR(50), fecha VARCHAR(50), pais VARCHAR(100),
        region VARCHAR(100), provincia VARCHAR(100), programa_estudios VARCHAR(150),
        cargo_institucion VARCHAR(100), anios_ensenando INT, profesion VARCHAR(100),
        score_total INT DEFAULT 0, nivel_docente VARCHAR(50),
        respuestas_json JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    echo "✅ kpi_docente_db creada exitosamente.\n";
} catch (PDOException $e) { echo "❌ Error: " . $e->getMessage() . "\n"; exit(1); }

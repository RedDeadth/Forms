<?php
$host = 'localhost'; $user = 'root'; $pass = ''; $dbName = 'viviendas_db';
try {
    $pdo = new PDO("mysql:host=$host", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName`");
    $pdo->exec("USE `$dbName`");
    $pdo->exec("CREATE TABLE IF NOT EXISTS inspecciones (
        id INT AUTO_INCREMENT PRIMARY KEY, inspector_nombre VARCHAR(150),
        tipo_vivienda VARCHAR(100), plantas VARCHAR(10), zona_construccion VARCHAR(50),
        fecha VARCHAR(50), pais VARCHAR(100), region VARCHAR(100), provincia VARCHAR(100),
        grado_estudios VARCHAR(100),
        score_electrico INT DEFAULT 0, score_incendio INT DEFAULT 0, score_caidas INT DEFAULT 0,
        score_humedad INT DEFAULT 0, score_estructural INT DEFAULT 0, score_salud INT DEFAULT 0,
        score_infantil INT DEFAULT 0, score_total INT DEFAULT 0, nivel_riesgo VARCHAR(50),
        respuestas_json JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    echo "✅ viviendas_db creada exitosamente.\n";
} catch (PDOException $e) { echo "❌ Error: " . $e->getMessage() . "\n"; exit(1); }

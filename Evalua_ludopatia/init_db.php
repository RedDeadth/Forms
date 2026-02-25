<?php
$host='localhost'; $user='root'; $pass=''; $dbName='ludopatia_db';
try {
    $pdo = new PDO("mysql:host=$host", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName`");
    $pdo->exec("USE `$dbName`");
    $pdo->exec("CREATE TABLE IF NOT EXISTS evaluaciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        evaluador_nombre VARCHAR(150), fecha VARCHAR(50), pais VARCHAR(100),
        region VARCHAR(100), provincia VARCHAR(100), grado_estudios_evaluador VARCHAR(100),
        sexo VARCHAR(20), edad INT, grado_instruccion VARCHAR(100),
        tipo_trabajo VARCHAR(100), nivel_socioeconomico VARCHAR(10),
        score_conducta INT DEFAULT 0, score_emocional INT DEFAULT 0, score_economico INT DEFAULT 0,
        score_relaciones INT DEFAULT 0, score_control INT DEFAULT 0, score_total INT DEFAULT 0,
        nivel_riesgo VARCHAR(50), respuestas_json JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    echo "✅ ludopatia_db creada exitosamente.\n";
} catch (PDOException $e) { echo "❌ Error: " . $e->getMessage() . "\n"; exit(1); }

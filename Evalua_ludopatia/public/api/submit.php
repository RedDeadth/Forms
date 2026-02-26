<?php
require_once __DIR__ . '/db.php';

// Base path para el proyecto
$BASE_PATH = '/evalua_ludopatia';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { 
    header('Location: ' . $BASE_PATH . '/'); 
    exit; 
}

try {
    $stmt = $pdo->prepare("INSERT INTO evaluaciones (evaluador_nombre, fecha, pais, region, provincia, grado_estudios_evaluador, sexo, edad, grado_instruccion, tipo_trabajo, nivel_socioeconomico, score_conducta, score_emocional, score_economico, score_relaciones, score_control, score_total, nivel_riesgo, respuestas_json) VALUES (:evaluador_nombre, :fecha, :pais, :region, :provincia, :grado_estudios_evaluador, :sexo, :edad, :grado_instruccion, :tipo_trabajo, :nivel_socioeconomico, :score_conducta, :score_emocional, :score_economico, :score_relaciones, :score_control, :score_total, :nivel_riesgo, :respuestas_json)");
    $stmt->execute([
        ':evaluador_nombre' => $_POST['evaluador_nombre'] ?? null,
        ':fecha' => $_POST['fecha'] ?? null,
        ':pais' => $_POST['pais'] ?? null,
        ':region' => $_POST['region'] ?? null,
        ':provincia' => $_POST['provincia'] ?? null,
        ':grado_estudios_evaluador' => $_POST['grado_estudios_evaluador'] ?? null,
        ':sexo' => $_POST['sexo'] ?? null,
        ':edad' => intval($_POST['edad'] ?? 0),
        ':grado_instruccion' => $_POST['grado_instruccion'] ?? null,
        ':tipo_trabajo' => $_POST['tipo_trabajo'] ?? null,
        ':nivel_socioeconomico' => $_POST['nivel_socioeconomico'] ?? null,
        ':score_conducta' => intval($_POST['score_conducta'] ?? 0),
        ':score_emocional' => intval($_POST['score_emocional'] ?? 0),
        ':score_economico' => intval($_POST['score_economico'] ?? 0),
        ':score_relaciones' => intval($_POST['score_relaciones'] ?? 0),
        ':score_control' => intval($_POST['score_control'] ?? 0),
        ':score_total' => intval($_POST['score_total'] ?? 0),
        ':nivel_riesgo' => $_POST['nivel_riesgo'] ?? null,
        ':respuestas_json' => $_POST['respuestas_json'] ?? '{}'
    ]);
    header('Location: ' . $BASE_PATH . '/gracias'); 
    exit;
} catch (Exception $e) { 
    error_log('Error: ' . $e->getMessage()); 
    header('Location: ' . $BASE_PATH . '/encuesta?error=db'); 
    exit; 
}

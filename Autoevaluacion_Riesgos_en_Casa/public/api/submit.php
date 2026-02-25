<?php
require_once __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: /'); exit; }
try {
    $stmt = $pdo->prepare("INSERT INTO inspecciones (inspector_nombre, tipo_vivienda, plantas, zona_construccion, fecha, pais, region, provincia, grado_estudios, score_electrico, score_incendio, score_caidas, score_humedad, score_estructural, score_salud, score_infantil, score_total, nivel_riesgo, respuestas_json) VALUES (:inspector_nombre, :tipo_vivienda, :plantas, :zona_construccion, :fecha, :pais, :region, :provincia, :grado_estudios, :score_electrico, :score_incendio, :score_caidas, :score_humedad, :score_estructural, :score_salud, :score_infantil, :score_total, :nivel_riesgo, :respuestas_json)");
    $stmt->execute([
        ':inspector_nombre' => $_POST['inspector_nombre'] ?? null,
        ':tipo_vivienda' => $_POST['tipo_vivienda'] ?? null,
        ':plantas' => $_POST['plantas'] ?? null,
        ':zona_construccion' => $_POST['zona_construccion'] ?? null,
        ':fecha' => $_POST['fecha'] ?? null,
        ':pais' => $_POST['pais'] ?? null,
        ':region' => $_POST['region'] ?? null,
        ':provincia' => $_POST['provincia'] ?? null,
        ':grado_estudios' => $_POST['grado_estudios'] ?? null,
        ':score_electrico' => intval($_POST['score_electrico'] ?? 0),
        ':score_incendio' => intval($_POST['score_incendio'] ?? 0),
        ':score_caidas' => intval($_POST['score_caidas'] ?? 0),
        ':score_humedad' => intval($_POST['score_humedad'] ?? 0),
        ':score_estructural' => intval($_POST['score_estructural'] ?? 0),
        ':score_salud' => intval($_POST['score_salud'] ?? 0),
        ':score_infantil' => intval($_POST['score_infantil'] ?? 0),
        ':score_total' => intval($_POST['score_total'] ?? 0),
        ':nivel_riesgo' => $_POST['nivel_riesgo'] ?? null,
        ':respuestas_json' => $_POST['respuestas_json'] ?? '{}'
    ]);
    header('Location: /gracias'); exit;
} catch (Exception $e) {
    error_log('Error in DB Submission: ' . $e->getMessage());
    header('Location: /encuesta?error=db'); exit;
}

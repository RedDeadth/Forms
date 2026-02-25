<?php
require_once __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: /'); exit; }
try {
    $stmt = $pdo->prepare("INSERT INTO evaluaciones (encuestado_nombre, institucion_educativa, tipo_gestion, fecha, pais, region, provincia, programa_estudios, cargo_institucion, anios_ensenando, profesion, score_total, nivel_docente, respuestas_json) VALUES (:encuestado_nombre, :institucion_educativa, :tipo_gestion, :fecha, :pais, :region, :provincia, :programa_estudios, :cargo_institucion, :anios_ensenando, :profesion, :score_total, :nivel_docente, :respuestas_json)");
    $stmt->execute([
        ':encuestado_nombre' => $_POST['encuestado_nombre'] ?? '',
        ':institucion_educativa' => $_POST['institucion_educativa'] ?? '',
        ':tipo_gestion' => $_POST['tipo_gestion'] ?? '',
        ':fecha' => $_POST['fecha'] ?? '',
        ':pais' => $_POST['pais'] ?? '',
        ':region' => $_POST['region'] ?? '',
        ':provincia' => $_POST['provincia'] ?? '',
        ':programa_estudios' => $_POST['programa_estudios'] ?? '',
        ':cargo_institucion' => $_POST['cargo_institucion'] ?? '',
        ':anios_ensenando' => intval($_POST['anios_ensenando'] ?? 0),
        ':profesion' => $_POST['profesion'] ?? '',
        ':score_total' => intval($_POST['score_total'] ?? 0),
        ':nivel_docente' => $_POST['nivel_docente'] ?? '',
        ':respuestas_json' => $_POST['respuestas_json'] ?? '{}'
    ]);
    header('Location: /gracias'); exit;
} catch (Exception $e) { error_log('Error: ' . $e->getMessage()); header('Location: /encuesta?error=db'); exit; }

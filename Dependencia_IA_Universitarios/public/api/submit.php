<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit;
}

try {
    // Datos personales
    $nombres = $_POST['nombres'] ?? null;
    $apellidos = $_POST['apellidos'] ?? null;
    $correo = $_POST['correo'] ?? null;
    $whatsapp = $_POST['whatsapp'] ?? null;
    $semestre = $_POST['semestre'] ?? null;
    $programa_estudios = $_POST['programa_estudios'] ?? null;
    $universidad = $_POST['universidad'] ?? null;
    $pais = $_POST['pais'] ?? null;
    $region = $_POST['region'] ?? null;
    $provincia = $_POST['provincia'] ?? null;

    // Respuestas q1-q23
    $q = [];
    for ($i = 1; $i <= 23; $i++) {
        $q[$i] = intval($_POST["q$i"] ?? 0);
    }

    // Scores
    $score_cognitiva = intval($_POST['score_cognitiva'] ?? 0);
    $score_sobreconfianza = intval($_POST['score_sobreconfianza'] ?? 0);
    $score_sustitucion = intval($_POST['score_sustitucion'] ?? 0);
    $score_compulsivo = intval($_POST['score_compulsivo'] ?? 0);
    $score_etico = intval($_POST['score_etico'] ?? 0);
    $score_total = intval($_POST['score_total'] ?? 0);

    // Resultados
    $nivel_dependencia = $_POST['nivel_dependencia'] ?? null;
    $diagnostico = $_POST['diagnostico'] ?? null;
    $idia_porcentaje = floatval($_POST['idia_porcentaje'] ?? 0);
    $idia_nivel = $_POST['idia_nivel'] ?? null;

    $stmt = $pdo->prepare("
        INSERT INTO evaluaciones_ia (
            nombres, apellidos, correo, whatsapp, semestre, programa_estudios, universidad, pais, region, provincia,
            q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23,
            score_cognitiva, score_sobreconfianza, score_sustitucion, score_compulsivo, score_etico, score_total,
            nivel_dependencia, diagnostico, idia_porcentaje, idia_nivel
        ) VALUES (
            :nombres, :apellidos, :correo, :whatsapp, :semestre, :programa_estudios, :universidad, :pais, :region, :provincia,
            :q1, :q2, :q3, :q4, :q5, :q6, :q7, :q8, :q9, :q10, :q11, :q12, :q13, :q14, :q15, :q16, :q17, :q18, :q19, :q20, :q21, :q22, :q23,
            :score_cognitiva, :score_sobreconfianza, :score_sustitucion, :score_compulsivo, :score_etico, :score_total,
            :nivel_dependencia, :diagnostico, :idia_porcentaje, :idia_nivel
        )
    ");

    $params = [
        ':nombres' => $nombres,
        ':apellidos' => $apellidos,
        ':correo' => $correo,
        ':whatsapp' => $whatsapp,
        ':semestre' => $semestre,
        ':programa_estudios' => $programa_estudios,
        ':universidad' => $universidad,
        ':pais' => $pais,
        ':region' => $region,
        ':provincia' => $provincia,
        ':score_cognitiva' => $score_cognitiva,
        ':score_sobreconfianza' => $score_sobreconfianza,
        ':score_sustitucion' => $score_sustitucion,
        ':score_compulsivo' => $score_compulsivo,
        ':score_etico' => $score_etico,
        ':score_total' => $score_total,
        ':nivel_dependencia' => $nivel_dependencia,
        ':diagnostico' => $diagnostico,
        ':idia_porcentaje' => $idia_porcentaje,
        ':idia_nivel' => $idia_nivel,
    ];

    for ($i = 1; $i <= 23; $i++) {
        $params[":q$i"] = $q[$i];
    }

    $stmt->execute($params);

    header('Location: /gracias');
    exit;

} catch (Exception $e) {
    error_log('Error in DB Submission: ' . $e->getMessage());
    header('Location: /encuesta?error=db');
    exit;
}

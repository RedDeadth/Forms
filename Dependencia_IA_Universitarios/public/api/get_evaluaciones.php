<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

// Verificar autenticación admin
if (!isset($_COOKIE['admin_auth']) || $_COOKIE['admin_auth'] !== 'true') {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

try {
    $stmt = $pdo->query('SELECT * FROM evaluaciones_ia ORDER BY created_at DESC LIMIT 50');
    $rows = $stmt->fetchAll();

    // Calcular estadísticas
    $total = count($rows);
    $saludable = 0;
    $funcional = 0;
    $alta = 0;
    $critica = 0;
    $sumScore = 0;
    $sumIDIA = 0;

    foreach ($rows as $r) {
        $sumScore += intval($r['score_total'] ?? 0);
        $sumIDIA += floatval($r['idia_porcentaje'] ?? 0);

        switch ($r['nivel_dependencia']) {
            case 'Uso saludable': $saludable++; break;
            case 'Dependencia funcional': $funcional++; break;
            case 'Dependencia alta': $alta++; break;
            case 'Dependencia crítica': $critica++; break;
        }
    }

    $stats = [
        'total' => $total,
        'saludable' => $saludable,
        'funcional' => $funcional,
        'alta' => $alta,
        'critica' => $critica,
        'avgScore' => $total > 0 ? round($sumScore / $total) : 0,
        'avgIDIA' => $total > 0 ? round($sumIDIA / $total, 1) : 0
    ];

    echo json_encode([
        'stats' => $stats,
        'evaluaciones' => $rows
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar la base de datos']);
}

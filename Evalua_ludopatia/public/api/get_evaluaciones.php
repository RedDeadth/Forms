<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');
if (!isset($_COOKIE['admin_auth']) || $_COOKIE['admin_auth'] !== 'true') {
    http_response_code(401); echo json_encode(['error' => 'No autorizado']); exit;
}
try {
    $stmt = $pdo->query('SELECT * FROM evaluaciones ORDER BY created_at DESC LIMIT 50');
    $rows = $stmt->fetchAll();
    $total = count($rows); $bajo=0; $leve=0; $moderado=0; $alto=0; $critico=0; $sum=0;
    foreach ($rows as $r) {
        $sum += intval($r['score_total'] ?? 0);
        switch ($r['nivel_riesgo']) {
            case 'Bajo': $bajo++; break; case 'Riesgo leve': $leve++; break;
            case 'Riesgo moderado': $moderado++; break; case 'Alto': $alto++; break;
            case 'Crítico': $critico++; break;
        }
    }
    echo json_encode(['stats' => ['total'=>$total,'bajo'=>$bajo,'leve'=>$leve,'moderado'=>$moderado,'alto'=>$alto,'critico'=>$critico,'avgScore'=>$total>0?round($sum/$total):0], 'evaluaciones'=>$rows]);
} catch (Exception $e) { http_response_code(500); echo json_encode(['error' => 'Error']); }

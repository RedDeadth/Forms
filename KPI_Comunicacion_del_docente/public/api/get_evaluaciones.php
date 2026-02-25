<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');
if (!isset($_COOKIE['admin_auth']) || $_COOKIE['admin_auth'] !== 'true') {
    http_response_code(401); echo json_encode(['error' => 'No autorizado']); exit;
}
try {
    $stmt = $pdo->query('SELECT * FROM evaluaciones ORDER BY created_at DESC LIMIT 50');
    $rows = $stmt->fetchAll();
    echo json_encode(['stats' => ['total' => count($rows)], 'evaluaciones' => $rows]);
} catch (Exception $e) { http_response_code(500); echo json_encode(['error' => 'Error']); }

<?php
require_once __DIR__ . '/db.php';

// Base path para el proyecto
$BASE_PATH = '/kpi_comunicacion';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { 
    header('Location: ' . $BASE_PATH . '/'); 
    exit; 
}

$type = $_POST['type'] ?? '';

if ($type === 'user') {
    $nombre = trim($_POST['nombre'] ?? '');
    if ($nombre !== '') {
        setcookie('user_name', $nombre, [
            'expires' => time() + 86400, 
            'path' => '/', 
            'httponly' => false, 
            'secure' => false, 
            'samesite' => 'Lax'
        ]);
        header('Location: ' . $BASE_PATH . '/encuesta'); 
        exit;
    } else { 
        header('Location: ' . $BASE_PATH . '/?error=nombre_vacio'); 
        exit; 
    }
}

if ($type === 'admin') {
    $pwd = $_POST['password'] ?? '';
    if ($pwd === 'admin123') {
        setcookie('admin_auth', 'true', [
            'expires' => time() + 86400, 
            'path' => '/', 
            'httponly' => false, 
            'secure' => false, 
            'samesite' => 'Lax'
        ]);
        header('Location: ' . $BASE_PATH . '/admin/dashboard'); 
        exit;
    } else { 
        header('Location: ' . $BASE_PATH . '/?error=credenciales'); 
        exit; 
    }
}

header('Location: ' . $BASE_PATH . '/?error=tipo_invalido'); 
exit;

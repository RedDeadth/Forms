<?php
require_once __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: /'); exit; }
$type = $_POST['type'] ?? '';
if ($type === 'user') {
    $nombre = trim($_POST['nombre'] ?? '');
    if ($nombre !== '') {
        setcookie('user_name', $nombre, ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
        header('Location: /encuesta'); exit;
    } else { header('Location: /?error=nombre_vacio'); exit; }
}
if ($type === 'admin') {
    $pwd = $_POST['password'] ?? '';
    if ($pwd === 'admin123') {
        setcookie('admin_auth', 'true', ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
        header('Location: /admin/dashboard'); exit;
    } else { header('Location: /?error=credenciales'); exit; }
}
header('Location: /?error=tipo_invalido'); exit;

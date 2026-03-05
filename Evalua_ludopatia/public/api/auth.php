<?php
require_once __DIR__ . '/db.php';
$BASE = '/evalua_ludopatia';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header("Location: $BASE/"); exit; }
$type = $_POST['type'] ?? '';
if ($type === 'user') {
    $email = trim($_POST['email'] ?? ''); $password = $_POST['password'] ?? '';
    if ($email === '' || $password === '') { header("Location: $BASE/?error=campos_vacios&view=login"); exit; }
    $stmt = $pdo->prepare('SELECT id, nombre, email, password_hash FROM usuarios WHERE email = :email');
    $stmt->execute([':email' => $email]); $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) { header("Location: $BASE/?error=credenciales&view=login"); exit; }
    setcookie('user_name', $user['nombre'], ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
    setcookie('user_email', $user['email'], ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
    header("Location: $BASE/encuesta"); exit;
}
if ($type === 'admin') {
    $pwd = $_POST['password'] ?? '';
    if ($pwd === 'admin123') {
        setcookie('admin_auth', 'true', ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
        header("Location: $BASE/admin/dashboard"); exit;
    } else { header("Location: $BASE/?error=credenciales&view=admin"); exit; }
}
header("Location: $BASE/?error=tipo_invalido"); exit;

<?php
require_once __DIR__ . '/db.php';
$BASE = '/kpi_comunicacion';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header("Location: $BASE/"); exit; }
$nombre = trim($_POST['nombre'] ?? ''); $email = trim($_POST['email'] ?? ''); $password = $_POST['password'] ?? ''; $password_confirm = $_POST['password_confirm'] ?? '';
if ($nombre === '' || $email === '' || $password === '') { header("Location: $BASE/?error=campos_vacios&view=register"); exit; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { header("Location: $BASE/?error=email_invalido&view=register"); exit; }
if (strlen($password) < 8) { header("Location: $BASE/?error=password_corta&view=register"); exit; }
if ($password !== $password_confirm) { header("Location: $BASE/?error=passwords_no_coinciden&view=register"); exit; }
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email'); $stmt->execute([':email' => $email]);
if ($stmt->fetch()) { header("Location: $BASE/?error=email_existe&view=register"); exit; }
try {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO usuarios (nombre, email, password_hash) VALUES (:nombre, :email, :hash)');
    $stmt->execute([':nombre' => $nombre, ':email' => $email, ':hash' => $hash]);
    setcookie('user_name', $nombre, ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
    setcookie('user_email', $email, ['expires' => time() + 86400, 'path' => '/', 'httponly' => false, 'secure' => false, 'samesite' => 'Lax']);
    header("Location: $BASE/encuesta"); exit;
} catch (Exception $e) { error_log('Error en registro: ' . $e->getMessage()); header("Location: $BASE/?error=registro_fallido&view=register"); exit; }

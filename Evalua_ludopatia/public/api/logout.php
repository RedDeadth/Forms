<?php
// Base path para el proyecto
$BASE_PATH = '/evalua_ludopatia';

setcookie('user_name', '', ['expires' => time() - 3600, 'path' => $BASE_PATH . '/']);
setcookie('admin_auth', '', ['expires' => time() - 3600, 'path' => $BASE_PATH . '/']);
header('Location: ' . $BASE_PATH . '/'); 
exit;

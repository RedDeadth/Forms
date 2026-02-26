<?php
// Base path para el proyecto
$BASE_PATH = '/kpi_comunicacion';

setcookie('user_name', '', ['expires' => time() - 3600, 'path' => '/']);
setcookie('admin_auth', '', ['expires' => time() - 3600, 'path' => '/']);
header('Location: ' . $BASE_PATH . '/'); 
exit;

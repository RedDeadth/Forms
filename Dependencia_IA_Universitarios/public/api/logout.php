<?php
$BASE = '/dependencia_ia';
setcookie('user_name', '', ['expires' => time() - 3600, 'path' => '/']);
setcookie('user_email', '', ['expires' => time() - 3600, 'path' => '/']);
setcookie('admin_auth', '', ['expires' => time() - 3600, 'path' => '/']);
header("Location: $BASE/"); exit;

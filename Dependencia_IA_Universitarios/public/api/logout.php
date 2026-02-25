<?php
// Borrar cookies de sesión
setcookie('user_name', '', ['expires' => time() - 3600, 'path' => '/']);
setcookie('admin_auth', '', ['expires' => time() - 3600, 'path' => '/']);

header('Location: /');
exit;

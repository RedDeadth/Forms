# 📋 Formularios Web — Hosting Compartido (ntchosting.com)

Suite de 4 encuestas web construidas con **Astro (estático)** + **PHP Backend** + **MySQL**.
Diseñadas para funcionar en hosting compartido **sin Node.js**.

---

## 📂 Proyectos

| Proyecto | Base de Datos | Tabla | Descripción |
|----------|---------------|-------|-------------|
| `Dependencia_IA_Universitarios` | `dependencia_ia_db` | `evaluaciones_ia` | Cuestionario IDIA sobre dependencia a la IA |
| `Autoevaluacion_Riesgos_en_Casa` | `viviendas_db` | `inspecciones` | Autoevaluación de riesgos en viviendas (7 categorías) |
| `Evalua_ludopatia` | `ludopatia_db` | `evaluaciones` | Evaluación de ludopatía (5 categorías) |
| `KPI_Comunicacion_del_docente` | `kpi_docente_db` | `evaluaciones` | KPI de comunicación del docente (21 preguntas) |

---

## 🚀 Pasos para Desplegar en ntchosting

### 1. Compilar el proyecto

```bash
cd <nombre_del_proyecto>
npm install       # Solo la primera vez
npm run build     # Genera la carpeta dist/
```

### 2. Crear la base de datos

#### Opción A: Desde el panel de ntchosting
- Crear una base de datos MySQL desde cPanel.
- Anotar: **host**, **usuario**, **contraseña** y **nombre de la DB**.

#### Opción B: Con el script PHP
- Subir `init_db.php` al hosting y ejecutarlo una vez desde el navegador:
  ```
  https://tudominio.com/init_db.php
  ```
- ⚠️ **Eliminar `init_db.php` después de ejecutarlo** por seguridad.

### 3. Configurar credenciales de MySQL

Antes de subir, editar **`dist/api/db.php`** con las credenciales reales:

```php
$DB_HOST = 'localhost';        // Puede variar según ntchosting
$DB_USER = 'tu_usuario_mysql';
$DB_PASS = 'tu_contraseña';
$DB_NAME = 'nombre_de_tu_db';
```

### 4. Subir archivos al hosting

Subir **todo el contenido de la carpeta `dist/`** a la carpeta `public_html/` del hosting.

```
dist/
├── index.html          → Página de login
├── encuesta/
│   └── index.html      → Formulario de encuesta
├── gracias/
│   └── index.html      → Página de confirmación
├── admin/
│   └── dashboard/
│       └── index.html  → Panel de administrador
├── api/
│   ├── db.php          → Conexión a MySQL
│   ├── auth.php        → Autenticación (login)
│   ├── logout.php      → Cierre de sesión
│   ├── submit.php      → Envío de datos a la BD
│   └── get_*.php       → API JSON para el dashboard
└── _astro/             → Assets (JS, CSS)
```

### 5. Verificar funcionamiento

1. Acceder a `https://tudominio.com/`
2. Probar login de **usuario** (escribir cualquier nombre)
3. Completar la encuesta y enviarla
4. Verificar que redirige a `/gracias`
5. Probar login de **administrador** (contraseña: `admin123`)
6. Verificar que el dashboard carga los datos

---

## 🔑 Credenciales por defecto

| Rol | Credencial |
|-----|-----------|
| **Usuario** | Cualquier nombre |
| **Administrador** | `admin123` |

> ⚠️ **Cambiar la contraseña de admin** en `dist/api/auth.php` antes de producción.

---

## 🏗️ Arquitectura

```
Frontend (Astro estático)          Backend (PHP)
┌─────────────────────┐     ┌─────────────────────┐
│  index.html         │────▶│  auth.php            │──┐
│  encuesta/index.html│────▶│  submit.php          │  │
│  gracias/index.html │────▶│  logout.php          │  │
│  admin/dashboard/   │────▶│  get_evaluaciones.php│  │
│     index.html      │  ↑  └──────────┬───────────┘  │
└─────────────────────┘  │             │              │
     Alpine.js (AJAX) ───┘         PDO v              ▼
                              ┌──────────────────┐
                              │   MySQL Database  │
                              └──────────────────┘
```

---

## 🔧 Desarrollo Local

Requisitos: **Node.js 18+**, **XAMPP/MySQL**, **PHP 7.4+**

```bash
# Inicializar la base de datos
php init_db.php

# Desarrollo con hot-reload
npm run dev

# Build para producción
npm run build
```

---

## 📝 Notas Importantes

- Los archivos PHP en `public/api/` se copian automáticamente a `dist/api/` durante el build.
- El dashboard usa **fetch() + Alpine.js** para cargar datos dinámicamente desde los endpoints PHP.
- Las cookies de sesión duran **24 horas** y se borran al cerrar sesión.
- Las consultas usan **PDO con prepared statements** para prevenir SQL injection.

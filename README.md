# Sistema de Gestión de Áreas y Empleados

## Descripción

Este es un sistema de gestión que permite administrar áreas y empleados de una organización. La aplicación está construida como una arquitectura monorepo con dos aplicaciones principales: una API backend y una aplicación frontend.

## Estructura del Proyecto

```
poc-SdT/
├── apps/
│   ├── api/           # Backend API con NestJS
│   └── client/        # Frontend con Angular
├── sql/              # Scripts de base de datos
└── package.json      # Configuración del monorepo
```

## Tecnologías Utilizadas

### Frontend (Angular)

- Angular 19
- PrimeNG 19.1.3 para componentes UI
- TailwindCSS para estilos
- HttpClient para llamadas API
- Signals para gestión de estado

### Backend (NestJS)

- NestJS 10
- MySQL como base de datos
- Swagger para documentación de API

## Funcionalidades Principales

### Gestión de Áreas

- Visualización de áreas existentes
- Visualizaciónde colores a cada área
- Tabla con información de áreas
- Interfaz responsive usando PrimeNG

### Gestión de Empleados

- Listado de empleados
- Asociación de empleados a áreas
- Estado de carga en tiempo real

## Base de Datos

La base de datos utiliza MySQL y consta de las siguientes tablas:

### Tabla `areas`

```sql
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULLCREATE TABLE areas (
);
```

### Tabla `employees`

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  identity_document INT,
  birth_date DATE,
  is_developer BOOLEAN,
  description TEXT,
  area_id INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE
);
```

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión 18 o superior)
- MySQL Server
- npm

### Instalación

1. Clonar el repositorio

```bash
git clone [URL_DEL_REPO]
cd poc-SdT
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar la base de datos

- Crear una base de datos MySQL
- Ejecutar los scripts de SQL en orden:
  - 002-create-tables.sql
  - 003-insert-default-areas.sql
  - 004-insert-default-employees.sql

### Ejecución

> Primero, tener instalado Docker

---

```bash
docker compose up -d
```

El proyecto es un monorepo creado con turborepo

Ejecutar front y back

```bash
turbo run start
```

Ejecutar front:

```bash
turbo run client:start
```

Ejecutar back

```bash
turbo run api:start
```

#### API Endpoints

Puedes ver todos los endpoints en http://localhost:3000/api - WIP 

### Áreas

- GET `/areas` - Obtener todas las áreas
- PATCH `/areas/:id` - Actualizar color de un área

### Empleados

- GET `/employees` - Obtener todos los empleados
- POST /employees - Editar un empleado
- DELETE /employees/soft - Eliminar logicamente un empleado
- DELETE /employees - Eliminar de la db un empleado

## Componentes Principales

### Frontend

- `AreaTableComponent`: Tabla de áreas con color picker - WIP 
- `EmployeesComponent`: Gestión de empleados
- `DashboardComponent`: Vista principal

### Backend

- `AreasController`: Controlador de áreas
- `EmployeesController`: Controlador de empleados

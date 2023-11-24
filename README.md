# Sistema de Almacenamiento y Consulta de Domicilios en Node.js

Este proyecto implementa un backend sin interfaz gráfica para almacenar y consultar domicilios, ofreciendo servicios a través de una API REST. La solución emula operaciones de autenticación y autorización, centrando su funcionalidad en la gestión de domicilios. Los datos se almacenan y consultan en una base de datos NoSQL, específicamente MongoDB alojado en la nube. Además, se utiliza Redis para el caché de consultas, y la aplicación y Redis están dockerizadas en una red conjunta. Las pruebas de carga se realizaron con JMeter, y la automatización de pruebas con Jenkins.

## Funcionalidades Principales:

1. **Almacenamiento y Consulta de Domicilios:**
   - El sistema permite almacenar y consultar información detallada sobre domicilios.

2. **Estructura de Datos:**
   - La información del domicilio se compone de Datos Persona y Dirección.
   - Datos Persona incluye CI (clave), Nombre, Apellido y Edad.
   - Dirección incluye Departamento, Localidad, Calle, Nro, Apartamento, Padrón, Ruta, Km, Letra, Barrio.

## Requerimientos Opcionales del Despliegue:

1. **Base de Datos NoSQL (MongoDB en la Nube):**
   - La solución utiliza MongoDB alojado en la nube para la persistencia de datos.

2. **Caché de Consultas (Redis):**
   - Se emplea Redis para el caché de consultas y mejorar el rendimiento.

3. **Dockerización:**
   - La aplicación y Redis están dockerizadas y conectadas a una red conjunta.

4. **Pruebas de Carga con JMeter:**
   - Se realizaron pruebas de carga utilizando JMeter para evaluar el rendimiento del sistema.

5. **Automatización con Jenkins:**
   - Jenkins se utiliza para la automatización de pruebas, proporcionando una integración continua en el proceso de desarrollo.

## Instrucciones de Uso:

1. **Configuración del Entorno:**
   - Clona el repositorio y accede al directorio del proyecto.

2. **Instalación de Dependencias:**
   - Ejecuta `npm install` para instalar las dependencias necesarias.

3. **Ejecución de Contenedores con Comandos Individuales:**

   - Para la API en Node.js:
     ```bash
     docker run --network=nosql -p 3000:3000 --name nosql2 -d nosql2
     ```

   - Para el contenedor de Redis:
     ```bash
     docker run --network=nosql -p 6379:6379 --name rediscache -d redis
     ```

4. **Inicio de la Aplicación:**
   - Ejecuta `npm start` para iniciar la aplicación localmente.

5. **Servicios REST:**
   - Accede a los servicios REST para almacenar y consultar domicilios.


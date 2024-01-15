# MedNet - Instrucciones de Implantación

Para instalar el Back-End de la aplicación, sigue los siguientes pasos:

### 1. Crear bases de datos

Crea dos bases de datos, una en MySQL y otra en MongoDB, para almacenar los datos de la aplicación.

### 2. Crear archivo ".env"

En la raíz del proyecto, crea un archivo llamado ".env" con los siguientes parámetros:

```env
DATABASE_URL="mysql://Usuario:MYSQLPassword@localhost:3306/NombreDeLaBD"
SECRET_KEY="ClavePrivadaJWT"
MONGO_DB="NombreDeLaBDMongoDB"
URI="mongodb://localhost:27017/"
```

- **DATABASE_URL:** Ruta de conexión a la base de datos MySQL.
- **SECRET_KEY:** Clave privada para JWT.
- **MONGO_DB:** Nombre de la base de datos de MongoDB.
- **URI:** Ruta de conexión a la base de datos MongoDB.


### 3. Instalar las dependencias

En el Terminal, ejecuta el comando `npm install` para instalar las dependencias del proyecto.

### 4. Compilar el proyecto

En el Terminal, ejecuta el comando `npm run build` para compilar el proyecto a una versión ejecutable.

### 5. Ejecutar el programa

Finalmente, para iniciar el servidor, ejecuta el comando `node dist/server.js` en el Terminal.

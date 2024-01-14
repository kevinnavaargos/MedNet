# MedNet - Instrucciones de Implantación

## Back-End

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

## Front-End

Para instalar el Front-End de la aplicación de manera exitosa, sigue los siguientes pasos:

### 1. Instalar las dependencias

En el Terminal, ejecuta el comando `npm install` para instalar las dependencias del proyecto.

### 2. Compilar el proyecto

Una vez instaladas las dependencias, ejecuta el comando `react-scripts build` para compilar el proyecto y generar una versión ejecutable. Este comando compilará y empaquetará el código del Front-End, generando archivos estáticos listos para ser desplegados en un servidor web.

### 3. Ejecutar el programa

Después de compilar el proyecto, puedes iniciar el servidor de desarrollo ejecutando el comando `react-scripts start`. Este comando iniciará el servidor de desarrollo y abrirá la aplicación en el navegador web, siendo accesible desde "http://localhost:3000" (o en otro puerto si el 3000 está en uso).

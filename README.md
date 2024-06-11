# Volsmart Challenge

## Comenzando 🚀

Este proyecto es una solución al [Challenge de Volsmart](https://docs.google.com/document/d/1ZxbHMIkE0NJYz9I9F1Jt2kSrjIRzyZ6j5eCaMj_Zy3k). Implementa un sistema basado en arquitectura de microservicios utilizando Kotlin + Ktor para el backend y React + Redux + Vite para el frontend.

- **Repositorio del proyecto:** [Volsmart](https://github.com/guidocohen/volsmart)
- **Diagramas del proyecto:** [Diagramas](https://app.diagrams.net/#G1hB6QZz2Co77DzV41IHM7BczbJ-3aourf#%7B%22pageId%22%3A%22kzjX3er9IRe1nn88BmJ2%22%7D)

## Funcionalidades

- Autenticación de usuarios mediante credenciales y JWT.
- Sincronización de usuarios desde servicio externo.
- Almacenamiento de usuarios en base de datos.
- Accesibilidad al listado de usuarios y búsqueda por campos.

## Prerrequisitos 📋

Herramientas y versiones necesarias para ejecutar el proyecto:

- **Gradle:** v8.5. [Instalación](https://gradle.org/install/)
- **IntelliJ IDEA:** [Instalación](https://www.jetbrains.com/help/idea/installation-guide.html#toolbox)
- **Visual Studio Code:** [Instalación](https://code.visualstudio.com/docs)
- **Docker Desktop:** [Instalación](https://www.docker.com/products/docker-desktop/)
- **Java:** v21
- **Kotlin:** v2.0.0
- **React:** v18.2
- **Vite:** v5.0.10
- **Tailwind CSS:** v3.4.0
- **Redux y Redux Toolkit:** redux 5.0.1 | react-redux 9.1.0 | toolkit 2.0.1

Para más información sobre compatibilidad de versiones, puedes consultar la [documentación de Gradle](https://docs.gradle.org/current/userguide/compatibility.html).

## Ejecución 🚀

Para ejecutar la aplicación Backend y Frontend se debe seguir los siguientes pasos

1. Clonar repositorio: `git clone https://github.com/guidocohen/volsmart.git`
2. Desde directorio docker dentro del Backend, ejecutar Docker para levantar MongoDB: `docker compose build` `docker compose up`
3. Establecer las variables de entorno para el servicio Backend: ver sección variables de entorno.
4. Ejecutar servicio Backend desde IntelliJ IDEA: `./gradlew build` `./gradlew run`
5. Instalar dependencias desde directorio Frontend: `npm install` o `yarn install`
6. Ejecutar la app desde el directorio Frontend: `npm run dev` or `yarn dev`
7. Abrir el navegador e ir a: `http://localhost:5173`

## Variables de entorno 🔧

- HOST
- PORT
- DB_MONGO_DATABASE
- DB_MONGO_HOST
- DB_MONGO_MAX_POOL_SIZE
- DB_MONGO_PASSWORD
- DB_MONGO_PORT
- DB_MONGO_USER
- JWT_AUDIENCE
- JWT_DOMAIN
- JWT_EXPIRES
- JWT_REALM
- JWT_SECRET
- MONGO_URL

## Autor ✒️

* **Guido Cohen Semag** - [guidocohen](https://github.com/guidocohen)

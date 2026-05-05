# Lab7-SisTecWeb

Laboratorio 7 de Sistemas y Tecnologías Web. Aquí dejé la parte de Express y la calculadora hecha con React + Vite.

## Parte 1: servidor con Express

En el laboratorio anterior el servidor estaba hecho con la librería nativa `http` de Node.js. Para este laboratorio lo adapté a Express, manteniendo las rutas que ya funcionaban.

### Diferencia entre `http` y Express

Con `http` uno tiene que crear el servidor manualmente, revisar la URL, decidir el tipo de respuesta y manejar cada ruta con varios `if`. Funciona, pero el código crece rápido y se vuelve más repetitivo.

Express ya trae una forma más ordenada de declarar rutas. Por ejemplo, se puede usar `app.get("/info", ...)` para decir exactamente qué pasa cuando alguien entra a `/info`. También facilita responder JSON con `res.json(...)`, devolver textos con `res.send(...)` y manejar errores sin escribir tanto código repetido.

En resumen: `http` sirve para entender cómo funciona un servidor desde abajo, pero Express es más cómodo para crear APIs reales porque organiza mejor las rutas y las respuestas.

### Rutas del servidor

El archivo principal es `servidor.js`.

Rutas disponibles:

- `/` responde `Servidor activo`.
- `/info` responde JSON con información del laboratorio.
- `/saludo` responde texto plano.
- `/api/status` responde JSON con el estado del servidor.
- `/api/student` responde los datos guardados en `datos.json`.
- Cualquier ruta que no exista responde `404`.

### Cómo correr el servidor

Primero instalar dependencias:

```bash
npm install
```

Luego levantar el servidor:

```bash
npm start
```

Queda disponible en:

```txt
http://localhost:3000
```

### Cómo probarlo

Con el servidor encendido:

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/info
curl -i http://localhost:3000/saludo
curl -i http://localhost:3000/api/student
curl -i http://localhost:3000/api/status
curl -i http://localhost:3000/no-existe
```

## Parte 2: calculadora con React y Vite

La calculadora está en la carpeta `calculadora-react`.

Tiene una interfaz personalizada, no dejé el estilo básico del tutorial. Usé una pantalla oscura, botones grandes, colores propios y una estructura centrada para que se vea limpia en computadora y celular.

Operaciones incluidas:

- suma
- resta
- multiplicación
- división

También agregué botón de limpiar (`C`), borrar un dígito (`⌫`) y control para división entre cero.

### Cómo correr la calculadora

Desde la carpeta principal:

```bash
npm run client:dev
```

O entrando a la carpeta:

```bash
cd calculadora-react
npm install
npm run dev
```

Vite muestra la URL local en la terminal, normalmente:

```txt
http://127.0.0.1:5173
```

### Cómo generar build

Desde la carpeta principal:

```bash
npm run client:build
```

### Prueba automática de la calculadora

Con la calculadora encendida en `http://127.0.0.1:5173`, se puede correr:

```bash
npm run client:test
```

## Pruebas realizadas

Comandos usados para revisar la entrega:

```bash
npm run check
npm start
npm run client:build
npm run client:test
```

También se probaron las rutas del servidor con `curl` y la calculadora en navegador.

## Videos de demostración

Dejé dos videos en la carpeta `docs`:

- `docs/lab7-express-demo.webm`
- `docs/lab7-calculadora-demo.webm`

# Lab6-SisTecWeb

Laboratorio de Node.js para Sistemas y Tecnologías Web.

## Qué se hizo en la Parte 1

Se tomó el servidor malo que venía en `docs/servidor-malo (1).js` y se dejó una versión corregida en `servidor.js`.

El objetivo fue que las rutas originales funcionaran bien:

- `/`
- `/info`
- `/api/student`
- cualquier ruta que no exista

## Cambios realizados

### 1. Se corrigió el cierre del servidor

El archivo original no cerraba bien la función de `http.createServer`. Por eso Node no podía levantar el servidor.

Ahora el servidor sí arranca correctamente con:

```bash
npm start
```

### 2. Se corrigió el tipo de respuesta de `/info`

El código tenía `application-json`, pero eso no es el tipo correcto.

En la Parte 1 se corrigió el encabezado de respuesta. En la Parte 2, la ruta se actualizó para responder un JSON válido con `application/json; charset=utf-8`.

### 3. Se corrigió la lectura de `datos.json`

El código original llamaba `fs.readFile`, pero no esperaba el resultado con `await`. Eso hacía que la ruta `/api/student` devolviera algo incorrecto.

Ahora sí lee el archivo, convierte el texto a JSON y responde datos reales.

### 4. Se agregó `datos.json`

La ruta `/api/student` necesitaba un archivo de datos. Se agregó `datos.json` con información simple para probar la API.

### 5. Se corrigió la ruta no encontrada

Antes cualquier ruta desconocida respondía con código `200`, aunque no existiera.

Ahora responde con código `404`, que es lo correcto para una ruta no encontrada.

## Cómo correrlo

```bash
npm start
```

El servidor queda en:

```txt
http://localhost:3000
```

## Cómo comprobarlo desde un cliente

Con el servidor encendido, se puede probar así:

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/info
curl -i http://localhost:3000/saludo
curl -i http://localhost:3000/api/student
curl -i http://localhost:3000/api/status
curl -i http://localhost:3000/no-existe
```

## Resultado esperado

`/` responde:

```txt
Servidor activo
```

`/info` responde un JSON:

```json
{"mensaje":"Informacion del laboratorio","curso":"Sistemas y Tecnologias Web","tecnologia":"Node.js"}
```

`/api/student` responde un JSON con los datos del archivo `datos.json`.

Una ruta que no existe responde:

```txt
Ruta no encontrada: /no-existe
```

y usa el código HTTP `404`.

## Pruebas realizadas

Después de levantar el servidor con `npm start`, se probó desde `curl`.

El resultado fue:

- `/` respondió `200 OK` y mostró `Servidor activo`.
- `/info` respondió `200 OK` y devolvió JSON con mensaje, curso y tecnología.
- `/saludo` respondió `200 OK` y mostró `Hola desde el servidor Node.js`.
- `/api/student` respondió `200 OK` y devolvió JSON desde `datos.json`.
- `/api/status` respondió `200 OK` y devolvió JSON con `ok`, `status` y `puerto`.
- `/no-existe` respondió `404 Not Found` y mostró `Ruta no encontrada: /no-existe`.

## Parte 2

Después de dejar funcionando el servidor base, se agregaron los cambios pedidos en la segunda parte del laboratorio.

### 1. `/info` ahora responde JSON

La ruta `/info` ya no devuelve texto fijo. Ahora responde un objeto JSON con:

- `mensaje`
- `curso`
- `tecnologia`

### 2. Nueva ruta `/saludo`

Se agregó la ruta `/saludo`, que responde texto plano:

```txt
Hola desde el servidor Node.js
```

### 3. Nueva ruta `/api/status`

Se agregó la ruta `/api/status`, que responde JSON con:

- `ok`
- `status`
- `puerto`

### 4. Respuesta 404 con ruta visitada

Cuando el usuario visita una ruta que no existe, el servidor responde `404` e incluye la ruta que intentó visitar.

Ejemplo:

```txt
Ruta no encontrada: /no-existe
```

## Comprobación de la Parte 2

Con el servidor encendido, se puede probar así:

```bash
curl -i http://localhost:3000/info
curl -i http://localhost:3000/saludo
curl -i http://localhost:3000/api/status
curl -i http://localhost:3000/no-existe
```

import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = process.env.PORT ?? 3000;

const sendText = (res, statusCode, body) => {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(body);
};

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (pathname === "/") {
      sendText(res, 200, "Servidor activo");
      return;
    }

    if (pathname === "/info") {
      sendJson(res, 200, {
        mensaje: "Informacion del laboratorio",
        curso: "Sistemas y Tecnologias Web",
        tecnologia: "Node.js"
      });
      return;
    }

    if (pathname === "/saludo") {
      sendText(res, 200, "Hola desde el servidor Node.js");
      return;
    }

    if (pathname === "/api/status") {
      sendJson(res, 200, {
        ok: true,
        status: "activo",
        puerto: Number(PORT)
      });
      return;
    }

    if (pathname === "/api/student") {
      const filePath = path.join(process.cwd(), "datos.json");
      const texto = await fs.readFile(filePath, "utf-8");
      sendJson(res, 200, JSON.parse(texto));
      return;
    }

    sendText(res, 404, `Ruta no encontrada: ${pathname}`);
  } catch (error) {
    sendJson(res, 500, {
      error: "Error interno del servidor",
      detalle: error.message
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

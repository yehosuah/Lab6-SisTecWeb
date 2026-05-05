import fs from "fs/promises";
import path from "path";
import express from "express";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.type("text/plain").send("Servidor activo");
});

app.get("/info", (req, res) => {
  res.json({
    mensaje: "Informacion del laboratorio",
    curso: "Sistemas y Tecnologias Web",
    tecnologia: "Express"
  });
});

app.get("/saludo", (req, res) => {
  res.type("text/plain").send("Hola desde el servidor Express");
});

app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    status: "activo",
    puerto: Number(PORT)
  });
});

app.get("/api/student", async (req, res, next) => {
  try {
    const filePath = path.join(process.cwd(), "datos.json");
    const texto = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(texto));
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).type("text/plain").send(`Ruta no encontrada: ${req.path}`);
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  res.status(500).json({
    error: "Error interno del servidor",
    detalle: error.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

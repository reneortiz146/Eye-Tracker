const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 4400;
const servidor = "34.66.103.0";
const nombreBD = "Books";
const usuario = "root";
const contrasena = "1234";

const conexion = mysql.createConnection({
  host: servidor,
  user: usuario,
  password: contrasena,
  database: nombreBD,
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.json({
    type: "application/json",
  })
);

app.use(cors());

app.get("/Link", async (req, res) => {
  try {
    console.log(req.query.bookName);
    const link = await consultarLinkPorNombre(req.query.bookName);
    console.log(link);
    res.json({ link: link });
    return link;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/LinkDownload", async (req, res) => {
  try {
    console.log(req.query.bookName);
    const link = await consultarLinkDescargaPorNombre(req.query.bookName);
    console.log(link);
    res.json({ link: link });
    return link;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error:", error);
  }
});

function consultarLinkPorNombre(name) {
  const sql = "SELECT link FROM Books.books WHERE name = ?";

  return new Promise((resolve, reject) => {
    conexion.query(sql, [name], function (error, resultados) {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        reject(error);
      } else {
        resolve(resultados[0].link);
      }
    });
  });
}

function consultarLinkDescargaPorNombre(name) {
  const sql = "SELECT linkDownload FROM Books.books WHERE name = ?";

  return new Promise((resolve, reject) => {
    conexion.query(sql, [name], function (error, resultados) {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        reject(error);
      } else {
        resolve(resultados[0].linkDownload);
      }
    });
  });
}

import pool from "../db/database.js";

export const AllProducts = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Iniciando la conexión");
    const rows = await conn.query("SELECT * FROM PRODUCT;");
    console.log("Datos obtenidos: ", rows);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ status: "No se encontraron productos" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error en la base de datos" });
    console.log("Error en la base de datos", err);
  } finally {
    if (conn) conn.end();
  }
};

export const DeleteProduct = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Iniciando la conexión");
    const rows = await conn.query(
      "DELETE FROM PRODUCT WHERE ID= " + req.params.IdProduct + ";"
    );
    console.log("Datos obtenidos: ", rows);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ status: "No se encontró el producto" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error en la base de datos" });
    console.log("Error en la base de datos", err);
  } finally {
    if (conn) conn.end();
  }
};




export const checkEndpoint= async (req, res) => {

  res.status(200).json({ status: "Endpoint funcionando correctamente" });
}
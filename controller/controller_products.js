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

export const addProduct = async (req, res) => {
  const {id, name, price, description, quantity, category_id, supplier_id } = req.body; 

  let conn;
  try {
      console.log("Datos del producto a añadir: ", id, name, price, description, quantity, category_id, supplier_id);
      conn = await pool.getConnection();
      console.log("Conexión establecida");

      const query = `
          INSERT INTO PRODUCT (ID, NAME, PRICE, DESCRIPTION, QUANTITY, CATEGORY_ID, SUPPLIER_ID)
          VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

      await conn.query(query, [id, name, price, description, quantity, category_id, supplier_id]);

      res.status(200).json({
          status: "Producto añadido exitosamente",
          product: {id, name, price, description, quantity, category_id, supplier_id, image },
      });

  } catch (err) {
      console.log("Error al añadir producto", err);
      res.status(500).json({ status: "Error al añadir el producto", error: err });
  } finally {
      if (conn) conn.end();
  }
};

export const modifyProduct = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del producto de los parámetros
  const { name, price, description, quantity, categoryId, supplierId } = req.body; // Obtiene los datos del producto del cuerpo de la petición

  let conn;
  try {
    console.log("ID del producto a modificar: ", id);
    // Obtener la conexión
    conn = await pool.getConnection();
    console.log("Conexión establecida");

    // Definir la consulta SQL para actualizar el producto
    const query = `
      UPDATE PRODUCT
      SET NAME = ?, PRICE = ?, DESCRIPTION = ?, QUANTITY = ?, CATEGORY_ID = ?, SUPPLIER_ID = ?
      WHERE ID = ?;
    `;

    // Ejecutar la consulta con los valores recibidos
    await conn.query(query, [name, price, description, quantity, categoryId, supplierId, id]);

    // Responder con éxito
    res.status(200).json({
      status: "Producto modificado exitosamente",
      id: id,
      product: { name, price, description, quantity, categoryId, supplierId },
    });
  } catch (err) {
    // Manejar errores
    console.log("Error al modificar el producto", err);
    res.status(500).json({ status: "Error al modificar el producto", error: err });
  } finally {
    // Asegurarse de cerrar la conexión
    if (conn) conn.end();
  }
};



export const checkEndpoint= async (req, res) => {

  res.status(200).json({ status: "Endpoint funcionando correctamente" });
}
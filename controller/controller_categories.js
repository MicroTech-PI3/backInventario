import pool from "../db/database.js";

export const AllCategories = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Iniciando la conexión");
    const rows = await conn.query("SELECT * FROM CATEGORY;");
    console.log("Datos obtenidos: ", rows);

    if (rows.length > 0) {
      res.status(200).json({
        status: "Se obtuvieron los datos correctamente",
        categories: rows,
      });
    } else {
      res.status(404).json({ status: "No se encontraron categorías" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error en la base de datos" });
    console.log("Error en la base de datos", err);
  } finally {
    if (conn) conn.end();
  }
};

export const addCategory = async (req, res) => {
  const { name, description } = req.body; // Datos de la categoría

  let conn;
  try {
    // Obtener la conexión
    conn = await pool.getConnection();
    console.log("Conexión establecida");

    // Definir la consulta SQL
    const query = `
            INSERT INTO CATEGORY (NAME, DESCRIPTION)
            VALUES (?, ?);
        `;

    // Ejecutar la consulta con los valores recibidos
    await conn.query(query, [name, description]);

    // Responder con éxito
    res.status(200).json({
      status: "Categoría añadida exitosamente",
      category: { name, description },
    });
  } catch (err) {
    // Manejar errores
    console.log("Error al añadir categoría", err);
    res
      .status(500)
      .json({ status: "Error al añadir la categoría", error: err });
  } finally {
    // Asegurarse de cerrar la conexión
    if (conn) conn.end();
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  let conn;
  try {
    console.log("ID de la categoría a eliminar: ", id);
    // Obtener la conexión
    conn = await pool.getConnection();
    console.log("Conexión establecida");

    // Definir la consulta SQL
    const query = `
            DELETE FROM CATEGORY
            WHERE ID = ?;
        `;

    // Ejecutar la consulta con los valores recibidos
    await conn.query(query, [id]);

    // Responder con éxito
    res.status(200).json({
      status: "Categoría eliminada exitosamente",
      id: id,
    });
  } catch (err) {
    // Manejar errores
    console.log("Error al eliminar la categoría", err);
    res
      .status(500)
      .json({ status: "Error al eliminar la categoría", error: err });
  } finally {
    // Asegurarse de cerrar la conexión
    if (conn) conn.end();
  }
};

export const modifyCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body; // Los datos del proveedor llegan en el cuerpo de la petición

  let conn;
  try {
    console.log("ID de la categoría a modificar: ", id);
    // Obtener la conexión
    conn = await pool.getConnection();
    console.log("Conexión establecida");

    // Definir la consulta SQL
    const query = `
            UPDATE CATEGORY
            SET NAME = ?, DESCRIPTION = ?
            WHERE ID = ?;
        `;

    // Ejecutar la consulta con los valores recibidos
    await conn.query(query, [name, description, id]);

    // Responder con éxito
    res.status(200).json({
      status: "Categoría modificada exitosamente",
      id: id,
      category: { name, description },
    });
  } catch (err) {
    // Manejar errores
    console.log("Error al modificar la categoría", err);
    res
      .status(500)
      .json({ status: "Error al modificar la categoría", error: err });
  } finally {
    // Asegurarse de cerrar la conexión
    if (conn) conn.end();
  }
};

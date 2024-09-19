import pool from "../db/database.js";

export const AllProducts = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Iniciando la conexión");
        const rows = await conn.query("SELECT * FROM PRODUCT;");
        console.log("Datos obtenidos: ", rows); // Verifica qué datos se están obteniendo
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

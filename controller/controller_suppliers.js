import pool from "../db/database.js";

export const AllSuppliers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Iniciando la conexión");
        const rows = await conn.query("SELECT * FROM SUPPLIER;");
        console.log("Datos obtenidos: ", rows);

        // Manejando el BigInt antes de enviar la respuesta porq al parecer alguien puso el numero de telefono
        //como BIGINT............................
        const serializedRows = rows.map(row => {
            return Object.fromEntries(
                Object.entries(row).map(([key, value]) => {
                    // Convierte BigInt a string.............
                    return [key, typeof value === 'bigint' ? value.toString() : value];
                })
            );
        });

        if (serializedRows.length > 0) {
            res.status(200).json({
                status: "Se obtuvieron los datos correctamente",
                suppliers: serializedRows, 
            });
        } else {
            res.status(404).json({ status: "No se encontraron proveedores" });
        }
    } catch (err) {
        res.status(500).json({ status: "Error en la base de datos" });
        console.log("Error en la base de datos", err);
    } finally {
        if (conn) conn.end();
    }
};


export const addSupplier = async (req, res) => {
    const {name, lastname, phone, email, city, brand } = req.body; // Los datos del proveedor llegan en el cuerpo de la petición

    let conn;
    try {
        // Obtener la conexión
        conn = await pool.getConnection();
        console.log("Conexión establecida");

        // Definir la consulta SQL
        const query = `
            INSERT INTO SUPPLIER (NAME, LASTNAME, PHONE, EMAIL, CITY, BRAND)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        // Ejecutar la consulta con los valores recibidos
        await conn.query(query, [name, lastname, phone, email, city, brand]);

        // Responder con éxito
        res.status(200).json({
            status: "Proveedor añadido exitosamente",
            supplier: {name, lastname, phone, email, city, brand },
        });

    } catch (err) {
        // Manejar errores
        console.log("Error al añadir proveedor", err);
        res.status(500).json({ status: "Error al añadir el proveedor", error: err });
    } finally {
        // Asegurarse de cerrar la conexión
        if (conn) conn.end();
    }
};

export const deleteSupplier = async (req, res) => {

    const { id } = req.params;

    let conn;
    try {
        console.log("ID del proveedor a eliminar: ", id);
        // Obtener la conexión
        conn = await pool.getConnection();
        console.log("Conexión establecida");

        // Definir la consulta SQL
        const query = `
            DELETE FROM SUPPLIER
            WHERE ID = ?;
        `;

        // Ejecutar la consulta con los valores recibidos
        await conn.query(query, [id]);

        // Responder con éxito
        res.status(200).json({
            status: "Proveedor eliminado exitosamente",
            id: id,
        });

    } catch (err) {
        // Manejar errores
        console.log("Error al eliminar proveedor", err);
        res.status(500).json({ status: "Error al eliminar el proveedor", error: err });
    } finally {
        // Asegurarse de cerrar la conexión
        if (conn) conn.end();
    }
}    

export const modidySupplier = async (req, res) => {
    

    const { id } = req.params;
    const {name, lastname, phone, email, city, brand } = req.body; // Los datos del proveedor llegan en el cuerpo de la petición

    let conn;
    try {
        console.log("ID del proveedor a modificar: ", id);
        // Obtener la conexión
        conn = await pool.getConnection();
        console.log("Conexión establecida");

        // Definir la consulta SQL
        const query = `
            UPDATE SUPPLIER
            SET NAME = ?, LASTNAME = ?, PHONE = ?, EMAIL = ?, CITY = ?, BRAND = ?
            WHERE ID = ?;
        `;

        // Ejecutar la consulta con los valores recibidos
        await conn.query(query, [name, lastname, phone, email, city, brand, id]);

        // Responder con éxito
        res.status(200).json({
            status: "Proveedor modificado exitosamente",
            id: id,
            supplier: {name, lastname, phone, email, city, brand },
        });

    } catch (err) {
        // Manejar errores
        console.log("Error al modificar proveedor", err);
        res.status(500).json({ status: "Error al modificar el proveedor", error: err });
    } finally {
        // Asegurarse de cerrar la conexión
        if (conn) conn.end();
    }
}

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
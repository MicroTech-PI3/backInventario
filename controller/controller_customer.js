import pool from "../db/database.js";

export const Allcustomers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Iniciando la conexión");
        const rows = await conn.query("SELECT * FROM CUSTOMER;");
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
                customers: serializedRows, 
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



export const addCustomer = async (req, res) => {
    const { id, name, lastname, phone, email, bill_via } = req.body; // Datos del cliente llegan en el cuerpo de la petición

    let conn;
    try {
        console.log("Datos del cliente a añadir: ",id, name, lastname, phone, email, bill_via);
        
        // Obtener la conexión
        conn = await pool.getConnection();
        console.log("Conexión establecida");

        // Definir la consulta SQL para la tabla CUSTOMER
        const query = `
            INSERT INTO CUSTOMER (ID, NAME, LASTNAME, PHONE, EMAIL, BILL_VIA)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        // Ejecutar la consulta con los valores recibidos
        await conn.query(query, [id, name, lastname, phone, email, bill_via]);

        // Responder con éxito
        res.status(200).json({
            status: "Cliente añadido exitosamente",
            customer: { id, name, lastname, phone, email, bill_via },
        });

    } catch (err) {
        // Manejar errores
        console.log("Error al añadir cliente", err);
        res.status(500).json({ status: "Error al añadir el cliente", error: err });
    } finally {
        // Asegurarse de cerrar la conexión
        if (conn) conn.end();
    }
};

export const modifyCustomer = async (req, res) => {

    const { id } = req.params;
    const { name, lastname, phone, email, bill_via } = req.body; // Los datos del proveedor llegan en el cuerpo de la petición

    let conn;
    try {
        console.log("ID del cliente a modificar: ", id);
        console.log("Datos del cliente a modificar: ", name, lastname, phone, email, bill_via);
        
        // Obtener la conexión
        conn = await pool.getConnection();
        console.log("Conexión establecida");

        // Definir la consulta SQL para actualizar los datos del proveedor
        const query = `
            UPDATE CUSTOMER
            SET NAME = ?, LASTNAME = ?, PHONE = ?, EMAIL = ?, BILL_VIA = ?
            WHERE ID = ?;
        `;

        // Ejecutar la consulta con los valores recibidos y el ID del proveedor a modificar
        await conn.query(query, [name, lastname, phone, email, bill_via, id]);

        // Responder con éxito
        res.status(200).json({
            status: "Cliente modificado exitosamente",
            customer: { id, name, lastname, phone, email, bill_via },
        });

    } catch (err) {
        // Manejar errores
        console.log("Error al modificar cliente", err);
        res.status(500).json({ status: "Error al modificar el cliente", error: err });
    } finally {
        // Asegurarse de cerrar la conexión
        if (conn) conn.end();
    }
}



export const deleteCustomer = async (req, res) => {

    const { id } = req.params;

    let conn;
    try {
        console.log("ID del proveedor a eliminar: ", id);
        // Obtener la conexión
        conn = await pool.getConnection();
        console.log("Conexión establecida");

        // Definir la consulta SQL
        const query = `
            DELETE FROM CUSTOMER
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

export const modidyCUSTOMER = async (req, res) => {
    
    
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
            UPDATE CUSTOMER
            SET NAME = ?, LASTNAME = ?, PHONE = ?, EMAIL = ?, CITY = ?, BRAND = ?
            WHERE ID = ?;
        `;

        // Ejecutar la consulta con los valores recibidos
        await conn.query(query, [name, lastname, phone, email, city, brand, id]);

        // Responder con éxito
        res.status(200).json({
            status: "Proveedor modificado exitosamente",
            id: id,
            CUSTOMER: {name, lastname, phone, email, city, brand },
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
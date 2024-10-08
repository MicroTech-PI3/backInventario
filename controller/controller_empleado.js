import pool from "../db/database.js";

export const employee = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Iniciando la conexión");
        const rows = await conn.query("SELECT * FROM EMPLOYEE WHERE ID=2;");
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
                employee: serializedRows, 
            });
        } else {
            res.status(404).json({ status: "No se encontro el empleado" });
        }
    } catch (err) {
        res.status(500).json({ status: "Error en la base de datos" });
        console.log("Error en la base de datos", err);
    } finally {
        if (conn) conn.end();
    }
};
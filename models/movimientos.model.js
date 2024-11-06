import { db } from '../database/connection.js';

// Crear un movimiento
const createMovimiento = async (tipo, cantidad, fecha, id_usuario, id_farmaco) => {
    const query = {
        text: `
        INSERT INTO MOVIMIENTOS (tipo, cantidad, fecha, id_usuario, id_farmaco)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        values: [tipo, cantidad, fecha, id_usuario, id_farmaco]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Obtener todos los movimientos
const getMovimientos = async () => {
    const query = {
        text: `
        SELECT 
            MOVIMIENTOS.tipo, 
            MOVIMIENTOS.cantidad, 
            MOVIMIENTOS.fecha, 
            USUARIOS.nombre AS usuario_nombre, 
            ROLES.nombre AS usuario_rol, 
            FARMACOS.nombre AS farmaco_nombre
        FROM MOVIMIENTOS
        JOIN USUARIOS ON MOVIMIENTOS.id_usuario = USUARIOS.id
        JOIN ROLES ON USUARIOS.id_Rol = ROLES.id
        JOIN FARMACOS ON MOVIMIENTOS.id_farmaco = FARMACOS.id
        ORDER BY MOVIMIENTOS.fecha DESC
        `
    };
    const { rows } = await db.query(query);
    return rows;
};

export const MovimientosModel = {
    createMovimiento,
    getMovimientos
};

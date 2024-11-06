import { db } from '../database/connection.js';

// Crear una alerta
const createAlerta = async (stock_minimo, mensaje, fecha, contrato_generado, id_farmaco) => {
    const query = {
        text: `
            INSERT INTO ALERTAS (stock_minimo, mensaje, fecha, contrato_generado, id_farmaco)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `,
        values: [stock_minimo, mensaje, fecha, contrato_generado, id_farmaco]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Obtener todas las alertas
const getAlertas = async () => {
    const query = {
        text: `SELECT * FROM ALERTAS`
    };
    const { rows } = await db.query(query);
    return rows;
};

// Obtener alerta por ID de fármaco
const getAlertaByFarmacoId = async (id_farmaco) => {
    const query = {
        text: `SELECT * FROM ALERTAS WHERE id_farmaco = $1`,
        values: [id_farmaco]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Actualizar alerta
const updateAlerta = async (id, stock_minimo) => {
    const query = {
        text: `UPDATE ALERTAS 
        SET stock_minimo = $1 
        WHERE id = $2 
        RETURNING *`
        ,
        values: [stock_minimo, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Eliminar alerta
const deleteAlerta = async (id) => {
    const query = {
        text: `DELETE FROM ALERTAS WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

export const AlertasModel = {
    createAlerta,
    getAlertas,
    getAlertaByFarmacoId,
    updateAlerta,
    deleteAlerta
};
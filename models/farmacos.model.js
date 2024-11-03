import { db } from '../database/connection.js';

// Función para crear un fármaco
const createFarmaco = async (nombre, cantidad, ubicacion) => {
    const query = {
        text: `
        INSERT INTO FARMACOS (nombre, cantidad, ubicacion)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        values: [nombre, cantidad, ubicacion]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para obtener todos los fármacos
const getFarmacos = async () => {
    const query = {
        text: `
        SELECT * FROM FARMACOS
        `
    };
    const { rows } = await db.query(query);
    return rows;
};

// Función para actualizar un fármaco
const updateFarmaco = async (id, nombre, cantidad, ubicacion) => {
    const query = {
        text: `
        UPDATE FARMACOS
        SET nombre = $1, cantidad = $2, ubicacion = $3
        WHERE id = $4
        RETURNING *
        `,
        values: [nombre, cantidad, ubicacion, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para eliminar un fármaco
const deleteFarmaco = async (id) => {
    const query = {
        text: `
        DELETE FROM FARMACOS WHERE id = $1
        RETURNING *
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para buscar un fármaco por nombre
const getFarmacoByNombre = async (nombre) => {
    const query = {
        text: `
        SELECT * FROM FARMACOS WHERE nombre = $1
        `,
        values: [nombre]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Exportar el modelo de fármacos
export const FarmacosModel = {
    createFarmaco,
    getFarmacos,
    updateFarmaco,
    deleteFarmaco,
    getFarmacoByNombre
};
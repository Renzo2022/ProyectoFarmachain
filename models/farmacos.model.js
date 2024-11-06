import { db } from '../database/connection.js';

// Crear un fármaco
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

// Obtener todos los fármacos
const getFarmacos = async () => {
    const query = {
        text: `
        SELECT * FROM FARMACOS
        `
    };
    const { rows } = await db.query(query);
    return rows;
};

// Actualizar un fármaco
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

// Eliminar un fármaco
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

// Buscar un fármaco por nombre
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

// Aumentar cantidad de fármaco
const aumentarFarmaco = async (id, cantidad) => {
    const query = {
        text: `
        UPDATE FARMACOS
        SET cantidad = cantidad + $1
        WHERE id = $2
        RETURNING *
        `,
        values: [cantidad, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Descontar cantidad de fármaco
const descontarFarmaco = async (id, cantidad) => {
    const query = {
        text: `
        UPDATE FARMACOS
        SET cantidad = cantidad - $1
        WHERE id = $2
        RETURNING *
        `,
        values: [cantidad, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

export const FarmacosModel = {
    createFarmaco,
    getFarmacos,
    updateFarmaco,
    deleteFarmaco,
    getFarmacoByNombre,
    aumentarFarmaco,
    descontarFarmaco
};
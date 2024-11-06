import { db } from '../database/connection.js';

// Crear un usuario
const create = async ({ nombre, correo, contrasena, id_rol }) => {
    const query = {
        text: `
        INSERT INTO usuarios (nombre, correo, contrasena, id_rol)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nombre, correo, id_rol
        `,
        values: [nombre, correo, contrasena, id_rol]
    }

    const { rows } = await db.query(query);
    return rows[0];
}

// Encontrar un usuario por su correo
const findOneByEmail = async (correo) => {
    const query = {
        text: `
        SELECT * FROM usuarios
        WHERE correo = $1
        `,
        values: [correo]
    }
    const { rows } = await db.query(query);
    return rows[0];
}

// Obtener todos los usuarios
const findAll = async () => {
    const query = {
        text: `
        SELECT * FROM usuarios
        `
    }
    const { rows } = await db.query(query);
    return rows;
}

export const UserModel = {
    create,
    findOneByEmail,
    findAll
}
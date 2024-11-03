import { db } from '../database/connection.js';

// Consulta para crear un usuario
// Función asincrónica que inserta un nuevo usuario en la tabla `usuarios`.
// Recibe un objeto con los valores `nombre`, `correo`, `contrasena`, y `id_rol`.
// Retorna el registro recién creado, incluyendo solo los campos `id`, `nombre`, `correo` e `id_rol`.
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

// Consulta para encontrar un usuario por su correo
// Función asincrónica que selecciona un usuario en la tabla `usuarios` según su correo.
// Retorna el primer registro encontrado con el correo especificado.
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

// Consulta para mostrar todos los usuarios
// Función asincrónica que selecciona todos los registros en la tabla `usuarios`.
// Retorna una lista de todos los usuarios registrados.
const findAll = async () => {
    const query = {
        text: `
        SELECT * FROM usuarios
        `
    }
    const { rows } = await db.query(query);
    return rows;
}

// Exportar el modelo de usuario, que incluye las funciones para crear, encontrar y eliminar usuarios.
export const UserModel = {
    create,
    findOneByEmail,
    findAll
}
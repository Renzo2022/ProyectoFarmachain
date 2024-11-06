// Importa las librerías necesarias para encriptar contraseñas y manejar tokens JWT
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UserModel } from "../models/usuarios.model.js";

// Controlador para el registro de usuarios
const register = async (req, res) => {
    try {
        const { nombre, correo, contrasena, id_rol } = req.body;

        // Genera un "salt" para la contraseña y la encripta
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(contrasena, salt);

        // Crea un nuevo usuario en la base de datos
        const newUser = await UserModel.create({
            nombre,
            correo,
            contrasena: hashedPassword,
            id_rol
        });

        // Genera un token JWT para el usuario con información adicional
        const token = jwt.sign(
            {
                correo: newUser.correo,
                id_rol: newUser.id_rol,
                userId: newUser.id,
                nombre: newUser.nombre
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respuesta exitosa con el token generado
        return res.status(201).json({
            ok: true,
            msg: {
                token,
                id_rol: newUser.id_rol
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
};

// Controlador para el inicio de sesión
const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        // Verifica que los campos de correo y contraseña no estén vacíos
        if (!correo || !contrasena) {
            return res.status(400).json({
                ok: false,
                msg: 'Por favor ingrese correo y contraseña'
            });
        }

        // Busca el usuario en la base de datos por el correo
        const user = await UserModel.findOneByEmail(correo);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        // Compara la contraseña ingresada con la encriptada en la base de datos
        const isMatch = await bcryptjs.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        // Genera el token JWT para el usuario autenticado
        const token = jwt.sign({
            correo: user.correo,
            id_rol: user.id_rol,
            userId: user.id,
            nombre: user.nombre
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respuesta exitosa con el token generado
        return res.status(200).json({
            ok: true,
            token,
            id_rol: user.id_rol,
            nombre: user.nombre
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
};

// Controlador para crear un veterinario (usado por el administrador)
const createTrabajador = async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        // Verifica que todos los campos necesarios sean proporcionados
        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                ok: false,
                msg: 'Por favor complete todos los campos requeridos: nombre, correo y contraseña'
            });
        }

        // Verifica si el correo ya está registrado
        const existingUser = await UserModel.findOneByEmail(correo);
        if (existingUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        // Encripta la contraseña y crea el veterinario en la base de datos
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(contrasena, salt);
        const newTrabajador = await UserModel.create({
            nombre,
            correo,
            contrasena: hashedPassword,
            id_rol: 2  // Rol de trabajador (id_rol = 2)
        });

        // Respuesta exitosa al crear el veterinario
        return res.status(201).json({
            ok: true,
            msg: 'Trabajador creado exitosamente',
            vet: { id: newTrabajador.id, nombre: newTrabajador.nombre, correo: newTrabajador.correo }
        });

    } catch (error) {
        console.log('Error al crear trabajador:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor al crear trabajador'
        });
    }
};

export const UserController = {
    register,
    login,
    createTrabajador,
};
import { Router } from "express";
import { UserController } from "../controllers/usuarios.controller.js";
import { verifyToken, verifyJefe } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Ruta para registrar usuarios
router.post('/register', UserController.register);

// Ruta para iniciar sesión
router.post('/login', UserController.login);

// Ruta para que el jefe pueda registrar trabajadores (requiere autenticación y permisos de jefe)
router.post('/registrar-trabajador', verifyToken, verifyJefe, UserController.createTrabajador);

export default router;
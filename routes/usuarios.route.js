// Importar módulos necesarios: Router de Express, controlador de usuarios y middlewares para autenticación y permisos
import { Router } from "express";
import { UserController } from "../controllers/usuarios.controller.js";
import { verifyToken, verifyJefe, verifyTrabajador} from "../middlewares/jwt.middlewares.js";

const router = Router(); // Crear instancia del Router de Express

// Rutas de autenticación y gestión de usuarios
router.post('/register', UserController.register); // Registro de usuarios
router.post('/login', UserController.login); // Inicio de sesión

// Solo jefes pueden registrar trabajadores
router.post('/registrar-trabajador', verifyToken, verifyJefe, UserController.createTrabajador);

// Exportar el router para usarlo en la aplicación
export default router;
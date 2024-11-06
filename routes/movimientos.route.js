import { Router } from 'express';
import { MovimientosController } from '../controllers/movimientos.controller.js';
import { verifyToken, verifyTrabajador, verifyJefe } from '../middlewares/jwt.middlewares.js';

const router = Router();

// Ruta para crear un fármaco junto con un movimiento, requiere autenticación y permisos de trabajador
router.post('/createFarmacoWithMovimiento', verifyToken, verifyTrabajador, MovimientosController.createFarmacoWithMovimiento);

// Ruta para obtener todos los movimientos, requiere autenticación y permisos de trabajador
router.get('/', verifyToken, verifyTrabajador, MovimientosController.getMovimientos);

export default router;
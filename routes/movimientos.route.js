import { Router } from 'express';
import { MovimientosController } from '../controllers/movimientos.controller.js';
import { verifyToken, verifyTrabajador, verifyJefe } from '../middlewares/jwt.middlewares.js';

const router = Router();

// Rutas para manejar los movimientos
router.post('/createFarmacoWithMovimiento', verifyToken, verifyTrabajador, MovimientosController.createFarmacoWithMovimiento); // Crear fármaco y movimiento
router.get('/', verifyToken, verifyTrabajador, MovimientosController.getMovimientos); // Obtener todos los movimientos

export default router;

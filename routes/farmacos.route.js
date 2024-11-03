import { Router } from 'express';
import { FarmacosController } from '../controllers/farmacos.controller.js';
import { verifyToken, verifyTrabajador, verifyJefe } from '../middlewares/jwt.middlewares.js';

const router = Router();

// Rutas para manejar los fármacos
router.post('/create', verifyToken, verifyJefe, FarmacosController.createFarmacoWithMovimiento); // Crear fármaco
router.get('/', verifyToken, verifyTrabajador, FarmacosController.getFarmacos); // Obtener todos los fármacos
router.get('/:nombre', verifyToken, verifyTrabajador, FarmacosController.getFarmacoByNombre); // Obtener fármaco por nombre
router.put('/update/:id', verifyToken, verifyTrabajador, FarmacosController.updateFarmaco); // Actualizar fármaco
router.delete('/delete/:id', verifyToken, verifyJefe, FarmacosController.deleteFarmaco); // Eliminar fármaco

export default router;
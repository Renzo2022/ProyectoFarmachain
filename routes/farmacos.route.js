import { Router } from 'express';
import { FarmacosController } from '../controllers/farmacos.controller.js';
import { verifyToken, verifyTrabajador, verifyJefe } from '../middlewares/jwt.middlewares.js';

const router = Router();

// Ruta para crear un fármaco, requiere autenticación y permisos de jefe
router.post('/create', verifyToken, verifyJefe, FarmacosController.createFarmacoWithMovimiento);

// Ruta para obtener todos los fármacos, requiere autenticación y permisos de trabajador
router.get('/', verifyToken, verifyTrabajador, FarmacosController.getFarmacos);

// Ruta para obtener un fármaco por nombre, requiere autenticación y permisos de trabajador
router.get('/:nombre', verifyToken, verifyTrabajador, FarmacosController.getFarmacoByNombre);

// Ruta para actualizar un fármaco, requiere autenticación y permisos de trabajador
router.put('/update/:id', verifyToken, verifyTrabajador, FarmacosController.updateFarmaco);

// Ruta para eliminar un fármaco, requiere autenticación y permisos de jefe
router.delete('/delete/:id', verifyToken, verifyJefe, FarmacosController.deleteFarmaco);

// Ruta para aumentar el stock de un fármaco, requiere autenticación y permisos de trabajador
router.put('/aumentar/:id', verifyToken, verifyTrabajador, FarmacosController.aumentarFarmaco);

// Ruta para descontar el stock de un fármaco, requiere autenticación y permisos de trabajador
router.put('/descontar/:id', verifyToken, verifyTrabajador, FarmacosController.descontarFarmaco);

export default router;
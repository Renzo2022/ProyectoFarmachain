import { MovimientosModel } from '../models/movimientos.model.js';
import { FarmacosModel } from '../models/farmacos.model.js';

// Controlador para crear un nuevo fármaco y automáticamente crear un movimiento
const createFarmacoWithMovimiento = async (req, res) => {//visualizar solo por tipo de movimiento
    try {
        const { nombre, cantidad, ubicacion } = req.body;
        const id_usuario = req.user.userId; // Obtener el id del usuario autenticado

        // Verificar que todos los campos necesarios estén presentes
        if (!nombre || !cantidad || !ubicacion) {
            return res.status(400).json({ ok: false, msg: 'Por favor complete todos los campos' });
        }

        // Crear el fármaco en la base de datos
        const newFarmaco = await FarmacosModel.createFarmaco(nombre, cantidad, ubicacion);

        // Crear el movimiento de tipo 'ENTRADA' para el fármaco agregado
        const tipo = 'ENTRADA';
        const fecha = new Date(); // Fecha del sistema en el momento de la creación

        await MovimientosModel.createMovimiento(tipo, cantidad, fecha, id_usuario, newFarmaco.id);

        return res.status(201).json({ ok: true, farmaco: newFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

// Controlador para obtener todos los movimientos
const getMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientosModel.getMovimientos();
        return res.status(200).json({ ok: true, movimientos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

export const MovimientosController = {
    createFarmacoWithMovimiento,
    getMovimientos
};

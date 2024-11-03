import { FarmacosModel } from '../models/farmacos.model.js';
import { MovimientosModel } from '../models/movimientos.model.js';

// Controlador para crear un nuevo fármaco
const createFarmaco = async (req, res) => {
    try {
        const { nombre, cantidad, ubicacion } = req.body;
        
        if (!nombre || !cantidad || !ubicacion) {
            return res.status(400).json({ ok: false, msg: 'Por favor complete todos los campos' });
        }

        const newFarmaco = await FarmacosModel.createFarmaco(nombre, cantidad, ubicacion);
        return res.status(201).json({ ok: true, farmaco: newFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

// Controlador para obtener todos los fármacos
const getFarmacos = async (req, res) => {
    try {
        const farmacos = await FarmacosModel.getFarmacos();
        return res.status(200).json({ ok: true, farmacos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

// Controlador para actualizar un fármaco
const updateFarmaco = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cantidad, ubicacion } = req.body;

        const updatedFarmaco = await FarmacosModel.updateFarmaco(id, nombre, cantidad, ubicacion);
        return res.status(200).json({ ok: true, farmaco: updatedFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

// Controlador para eliminar un fármaco
const deleteFarmaco = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFarmaco = await FarmacosModel.deleteFarmaco(id);
        return res.status(200).json({ ok: true, farmaco: deletedFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

// Controlador para obtener un fármaco por nombre
const getFarmacoByNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const farmaco = await FarmacosModel.getFarmacoByNombre(nombre);

        if (!farmaco) {
            return res.status(404).json({ ok: false, msg: 'Fármaco no existente' });
        }
        
        return res.status(200).json({ ok: true, farmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

const createFarmacoWithMovimiento = async (req, res) => {
    try {
        const { nombre, cantidad, ubicacion } = req.body;
        const id_usuario = req.user.userId; // Obtener el id del usuario autenticado

        // Verificar que todos los campos necesarios estén presentes
        if (!nombre || !cantidad || !ubicacion) {
            return res.status(400).json({ ok: false, msg: 'Por favor complete todos los campos' });
        }

        // Intentar crear el fármaco en la base de datos
        let newFarmaco;
        try {
            newFarmaco = await FarmacosModel.createFarmaco(nombre, cantidad, ubicacion);
        } catch (error) {
            if (error.code === '23505') { // Código de error para violación de restricción de unicidad en PostgreSQL
                return res.status(400).json({ ok: false, msg: 'Este fármaco ya existe' });
            }
            throw error; // Re-lanza el error si no es una violación de unicidad
        }

        // Crear el movimiento de tipo 'ENTRADA' para el fármaco agregado
        const tipo = 'ENTRADA';
        const fecha = new Date(); // Fecha del sistema en el momento de la creación

        // Crear el movimiento en la base de datos
        await MovimientosModel.createMovimiento(tipo, cantidad, fecha, id_usuario, newFarmaco.id);

        return res.status(201).json({ ok: true, farmaco: newFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

export const FarmacosController = {
    createFarmaco,
    getFarmacos,
    updateFarmaco,
    deleteFarmaco,
    getFarmacoByNombre,
    createFarmacoWithMovimiento
};
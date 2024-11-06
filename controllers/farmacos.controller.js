import { FarmacosModel } from '../models/farmacos.model.js';
import { MovimientosModel } from '../models/movimientos.model.js';
import { AlertasModel } from '../models/alertas.model.js';

// Controlador para crear un nuevo fármaco
const createFarmaco = async (req, res) => { //VARIABLE ESTADO PARA ACTIVAR O DESACTIVAR UN FARMACO
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

// Controlador para crear un farmaco y a la par un movimiento de tipo 'ENTRADA'
const createFarmacoWithMovimiento = async (req, res) => {
    try {
        const { nombre, cantidad, ubicacion, stock_minimo } = req.body;
        const id_usuario = req.user.userId;

        if (!nombre || !cantidad || !ubicacion || !stock_minimo) {
            return res.status(400).json({ ok: false, msg: 'Por favor complete todos los campos' });
        }

        let newFarmaco;
        try {
            newFarmaco = await FarmacosModel.createFarmaco(nombre, cantidad, ubicacion);
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ ok: false, msg: 'Este fármaco ya existe' });
            }
            throw error;
        }

        // Crear el movimiento de tipo 'ENTRADA'
        const tipo = 'ENTRADA';
        const fecha = new Date();
        await MovimientosModel.createMovimiento(tipo, cantidad, fecha, id_usuario, newFarmaco.id);

        // Crear la alerta de stock mínimo
        const mensaje = `El stock de ${nombre} ha sido registrado con un stock mínimo de ${stock_minimo}`;
        const contrato_generado = "Contrato"; // Valor por defecto para contrato generado
        await AlertasModel.createAlerta(stock_minimo, mensaje, fecha, contrato_generado, newFarmaco.id);

        return res.status(201).json({ ok: true, farmaco: newFarmaco });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

// Controlador para aumentar la cantidad de un farmaco y a la par crear un movimiento de tipo 'ENTRADA'
const aumentarFarmaco = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        const id_usuario = req.user.userId;

        const updatedFarmaco = await FarmacosModel.aumentarFarmaco(id, cantidad);

        // Crear el movimiento de tipo 'ENTRADA'
        const tipo = 'ENTRADA';
        const fecha = new Date();
        await MovimientosModel.createMovimiento(tipo, cantidad, fecha, id_usuario, updatedFarmaco.id);

        return res.status(200).json({ ok: true, farmaco: updatedFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al aumentar el fármaco' });
    }
};

// Controlador para descontar la cantidad de un farmaco y a la par crear un movimiento de tipo 'SALIDA'
const descontarFarmaco = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        const id_usuario = req.user.userId;

        const updatedFarmaco = await FarmacosModel.descontarFarmaco(id, cantidad);

        // Crear el movimiento de tipo 'SALIDA'
        const tipo = 'SALIDA';
        const fecha = new Date();
        await MovimientosModel.createMovimiento(tipo, cantidad, fecha, id_usuario, updatedFarmaco.id);

        return res.status(200).json({ ok: true, farmaco: updatedFarmaco });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error al descontar el fármaco' });
    }
};

export const FarmacosController = {
    createFarmaco,
    getFarmacos,
    updateFarmaco,
    deleteFarmaco,
    getFarmacoByNombre,
    createFarmacoWithMovimiento,
    aumentarFarmaco,
    descontarFarmaco
};
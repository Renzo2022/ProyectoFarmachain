import { AlertasModel } from '../models/alertas.model.js';

// Controlador para crear una nueva alerta
const createAlerta = async (req, res) => {
    try {
        const { stock_minimo, mensaje, id_farmaco } = req.body;
        const fecha = new Date();
        const contrato_generado = "Contrato";

        const newAlerta = await AlertasModel.createAlerta(stock_minimo, mensaje, fecha, contrato_generado, id_farmaco);
        return res.status(201).json({ ok: true, alerta: newAlerta });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: 'Error al crear la alerta' });
    }
};

// Controlador para obtener una alerta por el ID de un farmaco
const getAlertaByFarmacoId = async (req, res) => {
    try {
        const { id } = req.params;
        const alerta = await AlertasModel.getAlertaByFarmacoId(id);

        if (!alerta) {
            return res.status(404).json({ ok: false, msg: 'Alerta no encontrada' });
        }

        res.status(200).json({ ok: true, alerta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener la alerta' });
    }
};

// Controlador para actualizar el stock minimo de una alerta
const updateAlerta = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock_minimo } = req.body;

        if (!id) {
            return res.status(400).json({ ok: false, msg: 'El ID es requerido' });
        }

        const updatedAlerta = await AlertasModel.updateAlerta(id, stock_minimo);

        if (!updatedAlerta) {
            return res.status(404).json({ ok: false, msg: 'Alerta no encontrada' });
        }

        res.status(200).json({ ok: true, alerta: updatedAlerta });
    } catch (error) {
        console.error('Error al actualizar la alerta:', error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la alerta' });
    }
};

export const AlertasController = {
    createAlerta,
    getAlertaByFarmacoId,
    updateAlerta
};
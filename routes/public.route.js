// Importaciones necesarias
import { Router } from "express"; // Módulo de rutas de Express
import path from "path"; // Manejo de rutas de archivos
import { fileURLToPath } from 'url'; // Conversión de URL a rutas de archivos

const router = Router();

// Configuración de `__dirname` en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '../public'); // Ruta a la carpeta `public`

// Ruta para servir la página principal
router.get('/pagina-principal', (req, res) => {
    res.sendFile(path.join(publicPath, "paginaPrincipal.html"));
});

// Ruta para servir la página de registro de trabajador
router.get('/registrar-trabajador', (req, res) => {
    res.sendFile(path.join(publicPath, "registrarTrabajador.html"));
});

// Ruta para servir la página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, "login.html"));
});

// Ruta para servir el panel del jefe
router.get('/panel-jefe', (req, res) => {
    res.sendFile(path.join(publicPath, "panelJefe.html"));
});

// Ruta para servir el panel del trabajador
router.get('/panel-trabajador', (req, res) => {
    res.sendFile(path.join(publicPath, "panelTrabajador.html"));
});

// Ruta para servir la página de ingreso de fármacos
router.get('/ingresar-farmaco', (req, res) => {
    res.sendFile(path.join(publicPath, "ingresarFarmaco.html"));
});

// Ruta para servir la página de visualización de fármacos para el trabajador
router.get('/ver-farmacos-trabajador', (req, res) => {
    res.sendFile(path.join(publicPath, "verFarmacosTrabajador.html"));
});

// Ruta para servir la página de visualización de fármacos para el jefe
router.get('/ver-farmacos-jefe', (req, res) => {
    res.sendFile(path.join(publicPath, "verFarmacosJefe.html"));
});

// Ruta para servir la página de visualización de movimientos para el trabajador
router.get('/ver-movimientos-trabajador', (req, res) => {
    res.sendFile(path.join(publicPath, "verMovimientosTrabajador.html"));
});

// Ruta para servir la página de visualización de movimientos para el jefe
router.get('/ver-movimientos-jefe', (req, res) => {
    res.sendFile(path.join(publicPath, "verMovimientosJefe.html"));
});

// Ruta para servir la página de modificación de stock mínimo
router.get('/modificar-stock-minimo', (req, res) => {
    res.sendFile(path.join(publicPath, "modificarStockMinimo.html"));
});

export default router;
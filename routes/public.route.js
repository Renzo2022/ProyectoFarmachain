// Importaciones necesarias para gestionar rutas y manejo de archivos en Express
import { Router } from "express"; // Módulo para definir rutas
import path from "path"; // Para manejar rutas de archivos y directorios
import { fileURLToPath } from 'url'; // Para convertir URL a rutas de archivos

const router = Router();

// Configuración para definir `__dirname` manualmente en ES Modules
const __filename = fileURLToPath(import.meta.url); // Obtener el nombre del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio actual

const publicPath = path.join(__dirname, '../public'); // Ruta a la carpeta `public`

// Definición de rutas para servir archivos HTML específicos
router.get('/pagina-principal', (req, res) => {
    res.sendFile(path.join(publicPath, "paginaPrincipal.html")); // Página principal
});

router.get('/registrar-trabajador', (req, res) => {
    res.sendFile(path.join(publicPath, "registrarTrabajador.html")); // Registro de cliente
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, "login.html")); // Página de login
});

router.get('/panel-jefe', (req, res) => {
    res.sendFile(path.join(publicPath, "panelJefe.html")); // Panel del jefe
});

router.get('/panel-trabajador', (req, res) => {
    res.sendFile(path.join(publicPath, "panelTrabajador.html")); // Panel del trabajador
});

export default router; // Exportar las rutas configuradas para uso en la aplicación
import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    // Extraer el token eliminando el prefijo "Bearer"
    token = token.split(" ")[1];
    console.log('Token recibido:', token); // Log para depuración

    try {
        // Decodificar y verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { 
            correo: decoded.correo, 
            id_rol: decoded.id_rol, 
            userId: decoded.userId 
        };
        console.log('Usuario autenticado:', req.user);
        next(); // Continuar si es válido
    } catch (error) {
        // Verificar si el error es por token expirado o inválido
        const message = error.name === 'TokenExpiredError' ? "Token expirado" : "Token inválido o malformado";
        return res.status(401).json({ error: message });
    }
};

// Middleware para verificar si el usuario es jefe
export const verifyJefe = (req, res, next) => {
    // Permitir solo a usuarios con rol de jefe
    if (req.user.id_rol === 1) {
        return next();
    }
    return res.status(403).json({ error: "Acceso autorizado solo para jefes de inventario" });
};

// Middleware para verificar si el usuario es jefe o trabajador
export const verifyTrabajador = (req, res, next) => {
    console.log('Verificando rol del usuario:', req.user.id_rol);
    // Permitir a trabajadores (rol 2) o jefes (rol 1)
    if (req.user.id_rol === 2 || req.user.id_rol === 1) {
        return next();
    }
    return res.status(403).json({ error: "Acceso autorizado solo para jefes o trabajadores de inventario" });
};
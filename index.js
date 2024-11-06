import 'dotenv/config'
import express from 'express';

import userRouter from './routes/usuarios.route.js'
import farmacosRouter from './routes/farmacos.route.js'
import movimientosRouter from './routes/movimientos.route.js'
import alertasRouter from './routes/alertas.route.js'
import publicRouter from './routes/public.route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', publicRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/farmacos', farmacosRouter)
app.use('/api/v1/movimientos', movimientosRouter)
app.use('/api/v1/alertas', alertasRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor andando en el puerto ' + PORT))
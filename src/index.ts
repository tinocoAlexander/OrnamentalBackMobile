import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import sessionRoutes from './routes/session.routes';
import esp32Routes from './routes/esp32.routes';
import { errorHandler } from './middlewares/error.middleware';
import notificationsRoutes from './routes/notification.routes';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Aquí importaremos las rutas
app.use('/api/sessions', sessionRoutes);
app.use('/api/esp32', esp32Routes);
app.use('/api/notifications', notificationsRoutes);


app.get('/', (_req, res) => {
  res.json({ message: 'Backend de carrito podador funcionando!' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv'; // Cambia esta línea para importar dotenv correctamente
import bodyParser from 'body-parser'; // Asegúrate de que este paquete esté instalado
import cors from 'cors'; // Importa cors correctamente
// import authRoutes from './routes/authRoutes'; // Asegúrate de que esta ruta sea correcta
// const loanRoutes = require('./routes/loanRoutes');

// app.use('/api/loans', loanRoutes);

dotenv.config();

const app = express();

app.use(cors({
    origin: '*', // Permite solicitudes de cualquier origen
}));

app.use(bodyParser.json()); // Cambiado de bodyparse a bodyParser

// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
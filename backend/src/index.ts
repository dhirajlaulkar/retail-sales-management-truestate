import express from 'express';
import cors from 'cors';
import { initDB } from './services/db';
import { importData } from './services/importService';
import salesRoutes from './routes/salesRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

const startServer = async () => {
    try {
        await initDB();
        await importData();

        app.listen(PORT as number, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();

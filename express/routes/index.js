import express from 'express';
import paperRoutes from './paperRouter.js'

const app = express();

app.use('/papers', paperRoutes);

export default app;


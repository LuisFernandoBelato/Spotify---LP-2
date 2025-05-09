import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import __dirname from './utils/pathUtils.js';
import router from './routes/routes.js';
import connectDB from './config/db.js';

import { 
    staticMiddleware, 
    urlencodedMiddleware,  
    securityMiddleware, 
    jsonMiddleware, 
    compressionMiddleware
 } 
from './middlewares/middlewares.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

// Usando os Middlewares

app.use(staticMiddleware);
app.use(jsonMiddleware);
app.use(securityMiddleware);
app.use(compressionMiddleware);
//app.use(rateLimitMiddleware);
app.use(urlencodedMiddleware);
//app.use(morganMiddleware);

app.use('/backend/uploads', express.static(path.join(__dirname, 'backend/uploads')));

app.use(router);

app.listen(port, () => {
    console.log(`Servidor ativo rodando na porta ${port}`)
});
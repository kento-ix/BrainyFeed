import express from 'express';
import 'dotenv/config';
import apiRoute from './routes/index.js';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/v1', apiRoute);
app.listen(3000, ()=>console.log("listening on 3000"));


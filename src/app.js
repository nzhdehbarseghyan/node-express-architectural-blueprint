import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { auth } from './routes/index.js';

const app = express();
app.use(bodyParser.json());

app.use('/auth', auth);

export default app;

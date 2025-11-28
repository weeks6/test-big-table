import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import serviceRouter from './services/store/store.router.js';

const app = express();
const port = '3000';

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/store', serviceRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

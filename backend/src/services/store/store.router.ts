import { Router } from 'express';
import { validator } from '../../middlewares/validator.middleware.js';
import {
	StorePaginationQuery,
	StorePaginationQuerySchema,
} from './store.schema.js';

import Store from './store.service.js';
import z from 'zod';

const router = Router();

router.get('/list', validator(StorePaginationQuerySchema), async (req, res) => {
	// todo make request replace the actual req.query
	const query = StorePaginationQuerySchema.parse(req.query);

	res.json(
		await Store.list({
			cursor: query.cursor,
			limit: query.limit || 20,
		})
	);
});

export default router;

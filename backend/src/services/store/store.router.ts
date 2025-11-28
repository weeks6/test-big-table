import { Router } from 'express';
import { validator } from '../../middlewares/validator.middleware.js';
import {
	StorePaginationQuery,
	StorePaginationQuerySchema,
} from './store.schema.js';

import Store from './store.service.js';

const router = Router();

router.get('/list', validator(StorePaginationQuerySchema), async (req, res) => {
	const query = req.query as unknown as StorePaginationQuery;

	res.json(
		await Store.list({
			cursor: query.cursor,
			limit: query.limit || 20,
		})
	);
});

export default router;

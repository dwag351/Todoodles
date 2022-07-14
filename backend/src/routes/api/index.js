import express from 'express';

const router = express.Router();

import todos from './todos';
router.use('/todos', todos);

export default router;
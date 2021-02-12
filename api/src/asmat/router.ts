import { Router } from 'express';
import { handle } from '@corentind/expressive';
import { createAsmat, getById, searchAsmats, updateAsmatById } from './controller';
import secured from '../auth/cognito-middleware';

const router = Router();

router.get('/asmats/search', secured(), handle(({ query: { q } }) => searchAsmats(q)));
router.get('/asmats/:id', secured(), handle(({ params: { id } }) => getById(id)));

router.post('/asmats', secured(), handle(({ body }) => createAsmat(body)));

router.put('/asmats/:id', secured(), handle(({ params: { id }, body }) => updateAsmatById(id, body)));

export const AsmatRoutes = router;

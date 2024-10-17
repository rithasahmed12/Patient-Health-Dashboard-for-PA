import express from 'express';
import { createPriorAuthorization, getAllPriorAuthorizations, updatePriorAuthorizationStatus } from '../controllers/prior-auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
 '../middlewares/auth.middleware';
const priorAuthRouter = express.Router();

priorAuthRouter.post('/', authMiddleware,createPriorAuthorization);
priorAuthRouter.get('/', authMiddleware,getAllPriorAuthorizations);
priorAuthRouter.put('/:id/status', authMiddleware,updatePriorAuthorizationStatus);

export default priorAuthRouter;
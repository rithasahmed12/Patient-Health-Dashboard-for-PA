import express from 'express';
import { getAllPatients, getPatient, getPatients } from '../controllers/patient.controller';
import authMiddleware from '../middlewares/auth.middleware';
 '../middlewares/auth.middleware';

const patientRouter = express.Router();

patientRouter.get('/get',authMiddleware,getPatients);
patientRouter.get('/', authMiddleware,getAllPatients);
patientRouter.get('/:id',authMiddleware,getPatient);

export default patientRouter;
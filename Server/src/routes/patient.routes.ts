import express from 'express';
import { getPatient, getPatients } from '../controllers/patient.controller';

const patientRouter = express.Router();

patientRouter.get('/get', getPatients);
patientRouter.get('/:id',getPatient);

export default patientRouter;
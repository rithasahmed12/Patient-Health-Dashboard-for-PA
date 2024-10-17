import { Request, Response } from 'express';
import PatientModel from '../models/patient.model';
import { isValidObjectId } from 'mongoose';

export const getPatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid patient ID format' });
        }

        const patient = await PatientModel.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error in getPatient:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}


export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await PatientModel.find();

        if (!patients) {
            return res.status(404).json({ message: 'Patients not found' });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error('Error in getPatient:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}


export const getPatients = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const searchTerm = req.query.searchTerm as string || '';
    const minAge = parseInt(req.query.minAge as string) || 0;
    const maxAge = parseInt(req.query.maxAge as string) || 100;

    const query = {
      $and: [
        {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { condition: { $regex: searchTerm, $options: 'i' } }
          ]
        },
        { age: { $gte: minAge, $lte: maxAge } }
      ]
    };

    const totalCount = await PatientModel.countDocuments(query);
    const patients = await PatientModel.find(query)
      .select('name age condition status lastVisit')
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      patients,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
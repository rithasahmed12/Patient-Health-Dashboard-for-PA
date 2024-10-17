"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = exports.getAllPatients = exports.getPatient = void 0;
const patient_model_1 = __importDefault(require("../models/patient.model"));
const mongoose_1 = require("mongoose");
const getPatient = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: 'Invalid patient ID format' });
        }
        const patient = await patient_model_1.default.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    }
    catch (error) {
        console.error('Error in getPatient:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};
exports.getPatient = getPatient;
const getAllPatients = async (req, res) => {
    try {
        const patients = await patient_model_1.default.find();
        if (!patients) {
            return res.status(404).json({ message: 'Patients not found' });
        }
        res.status(200).json(patients);
    }
    catch (error) {
        console.error('Error in getPatient:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};
exports.getAllPatients = getAllPatients;
const getPatients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const searchTerm = req.query.searchTerm || '';
        const minAge = parseInt(req.query.minAge) || 0;
        const maxAge = parseInt(req.query.maxAge) || 100;
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
        const totalCount = await patient_model_1.default.countDocuments(query);
        const patients = await patient_model_1.default.find(query)
            .select('name age condition status lastVisit')
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({
            patients,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getPatients = getPatients;

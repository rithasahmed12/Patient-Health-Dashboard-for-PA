"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePriorAuthorizationStatus = exports.getAllPriorAuthorizations = exports.createPriorAuthorization = void 0;
const prior_auth_model_1 = __importDefault(require("../models/prior-auth.model"));
const createPriorAuthorization = async (req, res) => {
    try {
        const newAuthorization = new prior_auth_model_1.default(req.body);
        const savedAuthorization = await newAuthorization.save();
        res.status(201).json(savedAuthorization);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.createPriorAuthorization = createPriorAuthorization;
const getAllPriorAuthorizations = async (req, res) => {
    try {
        const authorizations = await prior_auth_model_1.default.find();
        res.status(200).json(authorizations);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.getAllPriorAuthorizations = getAllPriorAuthorizations;
const updatePriorAuthorizationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(status);
        if (!['pending', 'approved', 'denied'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const updatedAuthorization = await prior_auth_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedAuthorization) {
            return res.status(404).json({ message: 'Authorization not found' });
        }
        res.status(200).json(updatedAuthorization);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.updatePriorAuthorizationStatus = updatePriorAuthorizationStatus;

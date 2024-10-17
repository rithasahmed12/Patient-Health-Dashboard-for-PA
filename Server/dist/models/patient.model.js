"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const treatmentSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
});
const medicationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
});
const labResultSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    test: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
});
const patientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    insurance: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    treatments: [treatmentSchema],
    medications: [medicationSchema],
    labResults: [labResultSchema],
});
const PatientModel = mongoose_1.default.model("Patient", patientSchema);
exports.default = PatientModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const priorAuthorizationSchema = new mongoose_1.default.Schema({
    insuranceName: { type: String, required: true },
    insuranceDetails: { type: String, required: true },
    prescriberName: { type: String, required: true },
    prescriberSpecialty: { type: String, required: true },
    prescriberPhone: { type: String, required: true },
    prescriberEmail: { type: String, required: true },
    treatmentDetails: { type: String, required: true },
    treatmentType: { type: String, required: true },
    diagnosisCode: { type: String, required: true },
    patient: {
        value: { type: String, required: true },
        label: { type: String, required: true }
    },
    dateOfService: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    timestamp: { type: Date, default: Date.now }
});
const PriorAuthorization = mongoose_1.default.model('PriorAuthorization', priorAuthorizationSchema);
exports.default = PriorAuthorization;

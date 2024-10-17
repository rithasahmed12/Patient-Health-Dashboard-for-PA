"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("../controllers/patient.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
'../middlewares/auth.middleware';
const patientRouter = express_1.default.Router();
patientRouter.get('/get', auth_middleware_1.default, patient_controller_1.getPatients);
patientRouter.get('/', auth_middleware_1.default, patient_controller_1.getAllPatients);
patientRouter.get('/:id', auth_middleware_1.default, patient_controller_1.getPatient);
exports.default = patientRouter;

import mongoose from "mongoose";

const priorAuthorizationSchema = new mongoose.Schema({
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

const PriorAuthorization = mongoose.model('PriorAuthorization', priorAuthorizationSchema);

export default PriorAuthorization;
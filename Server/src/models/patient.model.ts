import mongoose, { Schema, Document } from "mongoose";

export interface ITreatment {
  date: string;
  type: string;
  details: string;
}

export interface IMedication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface ILabResult {
  date: string;
  test: string;
  result: string;
}

export interface IPatient extends Document {
  name: string;
  age: number;
  condition: string;
  dob: string; // Date of Birth
  gender: 'Male' | 'Female' | 'Other';
  insurance: string;
  status: string;
  treatments: ITreatment[];
  medications: IMedication[];
  labResults: ILabResult[];
}

const treatmentSchema: Schema<ITreatment> = new Schema({
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

const medicationSchema: Schema<IMedication> = new Schema({
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

const labResultSchema: Schema<ILabResult> = new Schema({
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

const patientSchema: Schema<IPatient> = new Schema({
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

const PatientModel = mongoose.model<IPatient>("Patient", patientSchema);

export default PatientModel;

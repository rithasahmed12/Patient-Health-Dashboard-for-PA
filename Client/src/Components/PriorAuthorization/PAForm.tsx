import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const patient = [
  { label: 'John Doe', value: '1' },
  { label: 'Jane Smith', value: '2' },
  { label: 'Bob Johnson', value: '3' },
  { label: 'Alice Williams', value: '4' }
];

const PriorAuthorizationSchema = Yup.object().shape({
  insuranceName: Yup.string().required('Insurance Name is required'),
  insuranceDetails: Yup.string().required('Insurance Details are required'),
  prescriberName: Yup.string().required('Prescriber Name is required'),
  prescriberSpecialty: Yup.string().required('Prescriber Specialty is required'),
  prescriberPhone: Yup.string().required('Prescriber Phone is required'),
  prescriberEmail: Yup.string().email('Invalid email format').required('Prescriber Email is required'),
  treatmentDetails: Yup.string().required('Treatment details are required'),
  treatmentType: Yup.string().required('Treatment Type is required'),
  diagnosisCode: Yup.string().required('Diagnosis Code is required'),
  patient: Yup.object().shape({
    label: Yup.string().required('Employee selection is required'),
  }).nullable(),
  dateOfService: Yup.date().required('Date of Service is required'),
});

interface PriorAuthorizationFormValues {
  insuranceName: string;
  insuranceDetails: string;
  prescriberName: string;
  prescriberSpecialty: string;
  prescriberPhone: string;
  prescriberEmail: string;
  treatmentDetails: string;
  treatmentType: string;
  diagnosisCode: string;
  patient: { label: string; value: string } | null;
  dateOfService: string;
}

const PriorAuthorizationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: PriorAuthorizationFormValues,
    { setSubmitting }: FormikHelpers<PriorAuthorizationFormValues>
  ) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(values);
    } catch (error) {
      console.error('Authorization error:', error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <h2 className="mb-8 text-xl font-semibold text-center">Prior Authorization Form</h2>
        <Formik<PriorAuthorizationFormValues>
          initialValues={{
            insuranceName: '',
            insuranceDetails: '',
            prescriberName: '',
            prescriberSpecialty: '',
            prescriberPhone: '',
            prescriberEmail: '',
            treatmentDetails: '',
            treatmentType: '',
            diagnosisCode: '',
            patient: null,
            dateOfService: '',
          }}
          validationSchema={PriorAuthorizationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side Fields */}
              <div className="flex flex-col">
                {/* Select Patient */}
                <div className="mb-6">
                  <label className="block mb-1">Select Patient*</label>
                  <Select
                    options={patient}
                    onChange={(option) => setFieldValue('patient', option)}
                    placeholder="Select patient..."
                    isSearchable
                  />
                  <ErrorMessage name="patient.label" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Insurance Name */}
                <div>
                  <label htmlFor="insuranceName" className="block mb-1">Insurance Name*</label>
                  <Field
                    type="text"
                    id="insuranceName"
                    name="insuranceName"
                    placeholder="Enter insurance name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="insuranceName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Insurance Details */}
                <div className="mt-4">
                  <label htmlFor="insuranceDetails" className="block mb-1">Insurance Details*</label>
                  <Field
                    type="text"
                    id="insuranceDetails"
                    name="insuranceDetails"
                    placeholder="Enter insurance details"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="insuranceDetails" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Prescriber Name */}
                <div className="mt-4">
                  <label htmlFor="prescriberName" className="block mb-1">Prescriber Name*</label>
                  <Field
                    type="text"
                    id="prescriberName"
                    name="prescriberName"
                    placeholder="Enter prescriber name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="prescriberName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Prescriber Specialty */}
                <div className="mt-4">
                  <label htmlFor="prescriberSpecialty" className="block mb-1">Specialty*</label>
                  <Field
                    type="text"
                    id="prescriberSpecialty"
                    name="prescriberSpecialty"
                    placeholder="Enter specialty"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="prescriberSpecialty" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Prescriber Phone */}
                <div className="mt-4">
                  <label htmlFor="prescriberPhone" className="block mb-1">Phone*</label>
                  <Field
                    type="text"
                    id="prescriberPhone"
                    name="prescriberPhone"
                    placeholder="Enter phone number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="prescriberPhone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Right Side Fields */}
              <div className="flex flex-col">
                {/* Prescriber Email */}
                <div className="mb-6">
                  <label htmlFor="prescriberEmail" className="block mb-1">Email*</label>
                  <Field
                    type="email"
                    id="prescriberEmail"
                    name="prescriberEmail"
                    placeholder="Enter email address"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="prescriberEmail" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Treatment Details */}
                <div className="mb-6">
                  <label htmlFor="treatmentDetails" className="block mb-1">Treatment Details*</label>
                  <Field
                    type="text"
                    id="treatmentDetails"
                    name="treatmentDetails"
                    placeholder="Enter treatment details"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="treatmentDetails" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Treatment Type */}
                <div className="mb-6">
                  <label htmlFor="treatmentType" className="block mb-1">Treatment Type*</label>
                  <Field
                    type="text"
                    id="treatmentType"
                    name="treatmentType"
                    placeholder="Enter treatment type"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="treatmentType" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Diagnosis Code */}
                <div className="mb-6">
                  <label htmlFor="diagnosisCode" className="block mb-1">Diagnosis Code*</label>
                  <Field
                    type="text"
                    id="diagnosisCode"
                    name="diagnosisCode"
                    placeholder="Enter diagnosis code"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="diagnosisCode" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Date of Service */}
                <div className="mb-6">
                  <label htmlFor="dateOfService" className="block mb-1">Date of Service*</label>
                  <Field
                    type="date"
                    id="dateOfService"
                    name="dateOfService"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="dateOfService" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PriorAuthorizationForm;

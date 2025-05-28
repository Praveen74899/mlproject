import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

// Utility functions
const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const toInputDate = (date) => {
  return date.toISOString().split('T')[0];
};

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};

const formatMonthYear = (dateStr) => {
  const [year, month] = dateStr.split('-');
  return `${month}-${year}`;
};

const ProjectForm = () => {
  const [dateDelivered, setDateDelivered] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectType: '',
      category: '',
      hours: '',
      dateReceived: getToday(),
      contactPerson: '',
      endClient: '',
    },
    validationSchema: Yup.object({
      projectName: Yup.string()
        .required('Project Name is required')
        .min(3, 'Minimum 3 characters'),
      projectType: Yup.string().required('Project Type is required'),
      category: Yup.string().required('Category is required'),
      hours: Yup.number()
        .required('Hours is required')
        .min(1, 'Minimum 1 hour')
        .max(1000, 'Maximum 1000 hours'),
      dateReceived: Yup.date()
        .required('Date Received is required')
        .min(getToday(), "Only today's date is allowed")
        .max(getToday(), "Only today's date is allowed"),
      contactPerson: Yup.string().required('Contact Person is required'),
      endClient: Yup.string().required('End Client Name is required'),
    }),
    onSubmit: async (values) => {
      if (!dateDelivered || dateDelivered <= values.dateReceived) {
        setError('Date Delivered must be after Date Received');
        return;
      }

      setError('');
      const formData = {
        ...values,
        dateDelivered,
      };

      try {
        const response = await fetch('http://localhost:4000/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message || 'Form submitted successfully!');
          formik.resetForm({ values: { ...formik.initialValues, dateReceived: getToday() } });
          setDateDelivered('');
        } else {
          toast.error(data.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-2 gap-x-8 gap-y-8 max-w-md mx-auto p-6 mt-7 bg-gray-200 rounded shadow"
    >
      {/* Project Name */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Project Name</label>
        <input
          type="text"
          name="projectName"
          placeholder="Enter project name"
          value={formik.values.projectName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.projectName && formik.errors.projectName && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.projectName}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Project Type</label>
        <select
          name="projectType"
          value={formik.values.projectType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Select Project Type</option>
          <option value="Mockups">Mockups</option>
          <option value="Proposals">Proposals</option>
          <option value="Presentations">Presentations</option>
          <option value="Credentials">Credentials</option>
          <option value="RFP">RFP</option>
          <option value="AI Work">AI Work</option>
          <option value="Creative Work">Creative Work</option>
        </select>
        {formik.touched.projectType && formik.errors.projectType && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.projectType}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Category</label>
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Select Category</option>
          <option value="Simple">Simple</option>
          <option value="Medium">Medium</option>
          <option value="Complex">Complex</option>
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.category}</p>
        )}
      </div>

      {/* Hours */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Hours</label>
        <input
          type="number"
          name="hours"
          placeholder="Estimated hours"
          value={formik.values.hours}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.hours && formik.errors.hours && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.hours}</p>
        )}
      </div>

      {/* Date Received */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Date Received</label>
        <input
          type="date"
          name="dateReceived"
          value={formik.values.dateReceived}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={getToday()}
          max={getToday()}
          placeholder="dd-mm-yyyy"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.dateReceived && formik.errors.dateReceived && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.dateReceived}</p>
        )}
      </div>

      {/* Date Delivered */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Date Delivered</label>
        <input
          type="date"
          value={dateDelivered}
          onChange={(e) => {
            setDateDelivered(e.target.value);
            if (formik.values.dateReceived && e.target.value <= formik.values.dateReceived) {
              setError('Date Delivered must be after Date Received');
            } else {
              setError('');
            }
          }}
          min={
            formik.values.dateReceived
              ? toInputDate(new Date(new Date(formik.values.dateReceived).getTime() + 86400000))
              : ''
          }
          placeholder="dd-mm-yyyy"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {dateDelivered && (
          <p className="text-sm text-gray-600 mt-1">
            Full Date: {formatDate(dateDelivered)} | Month-Year: {formatMonthYear(dateDelivered)}
          </p>
        )}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      {/* Contact Person */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          placeholder="Enter contact person"
          value={formik.values.contactPerson}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.contactPerson && formik.errors.contactPerson && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.contactPerson}</p>
        )}
      </div>

      {/* End Client */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">End Client Name</label>
        <input
          type="text"
          name="endClient"
          placeholder="Enter end client name"
          value={formik.values.endClient}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.endClient && formik.errors.endClient && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.endClient}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition col-span-2"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;

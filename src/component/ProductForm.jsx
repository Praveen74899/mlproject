import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Utility functions
const getToday = () => new Date().toISOString().split('T')[0];
const toInputDate = (date) => date.toISOString().split('T')[0];

// Yup validation schema
const validationSchema = Yup.object({
  projectName: Yup.string().min(3, 'At least 3 characters').required('Required'),
  projectType: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  hours: Yup.number().min(1, 'Minimum 1 hour').required('Required'),
  contactPerson: Yup.string().required('Required'),
  endClient: Yup.string().required('Required'),
  dateReceived: Yup.string()
    .required('Required')
    .test('is-today', "Only today's date is allowed", value => value === getToday()),
  dateDelivered: Yup.string()
    .required('Required')
    .test('after-received', 'Must be after Date Received', function (value) {
      return new Date(value) > new Date(this.parent.dateReceived);
    }),
});

const ProductForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectType: '',
      category: '',
      hours: '',
      dateReceived: getToday(),
      dateDelivered: '',
      contactPerson: '',
      endClient: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Submitting values:', values);
      try {
        const res = await fetch('http://localhost:4000/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        
        if (res.ok) {
          console.log('✅ Project submitted successfully:', data); // 👈 Better log
          toast.success(data.message || 'Project submitted successfully');
          resetForm();
          navigate('/dashboard');
        } else {
          console.error('❌ Backend validation error:', data);
          toast.error(data.message || 'Submission failed');
        }

      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    },
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
          value={formik.values.projectName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter project name"
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

      {/* Contact Person */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          value={formik.values.contactPerson}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter contact person"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.contactPerson && formik.errors.contactPerson && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.contactPerson}</p>
        )}
      </div>

      {/* End Client */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">End Client</label>
        <input
          type="text"
          name="endClient"
          value={formik.values.endClient}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter end client"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.endClient && formik.errors.endClient && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.endClient}</p>
        )}
      </div>

      {/* Hours */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Hours</label>
        <input
          type="number"
          name="hours"
          value={formik.values.hours}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Estimated hours"
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
          name="dateDelivered"
          value={formik.values.dateDelivered}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={toInputDate(new Date(new Date(formik.values.dateReceived).getTime() + 86400000))}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {formik.touched.dateDelivered && formik.errors.dateDelivered && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.dateDelivered}</p>
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

export default ProductForm;

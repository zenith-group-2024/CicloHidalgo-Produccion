import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';

const InputField = ({ label, type = 'text', name, value, onChange, accept }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        accept={accept}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const CRUDForm = ({ resourceName, fields, onSubmit, imageUrl }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        {imageUrl && <img  src={logo} alt={`${resourceName} Logo`} className="w-24 h-24 mr-4 object-contain" />}
        <h2 className="text-2xl font-semibold">{`Formulario de ${resourceName}`}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            accept={field.accept}
          />
        ))}

        <InputField
          label="Archivo"
          type="file"
          name="archivo"
          accept="image/*,video/*"
          onChange={handleChange}
        />

        <div className="mt-6 flex justify-center space-x-4">
          <button type="submit" className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Guardar
          </button>
          <button type="reset" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
            Resetear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CRUDForm;
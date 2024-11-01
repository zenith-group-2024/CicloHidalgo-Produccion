import React, { useState } from 'react';
import { useCrearAdmin } from '../../hooks/useCrearAdmin.js';

const FormCrearAdmin = ({ onClose }) => {
  const { crear, message } = useCrearAdmin();
  const [admin, setAdmin] = useState({
    nombre: '',
    email: '',
    password: '',
    contacto: '',
    direccion: '',
    cumpleanos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crear(admin.nombre, admin.email, admin.password, admin.contacto, admin.direccion, admin.cumpleanos);
    onClose();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">Añadir Administrador</h2>

        <div className="grid gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={admin.nombre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={admin.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={admin.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="contacto"
            placeholder="Contacto"
            value={admin.contacto}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={admin.direccion}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <input
            type="date"
            name="cumpleanos"
            placeholder="Cumpleaños"
            value={admin.cumpleanos}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue text-white px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 focus:outline-none"
        >
          Crear
        </button>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default FormCrearAdmin;
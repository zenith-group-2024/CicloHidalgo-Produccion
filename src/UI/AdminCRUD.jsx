import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import CRUDForm from './CRUDForm';

const AdminCRUD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resource = location.pathname.split('/').pop();

  const handleSubmit = (data) => {
    console.log('Datos enviados:', data);
  };

  const resourceFields = {
    productos: [
      { label: 'Nombre del Producto', name: 'nombre', type: 'text' },
      { label: 'Descripción', name: 'descripcion', type: 'text' },
      { label: 'Precio', name: 'precio', type: 'number' },
    ],
    servicios: [
      { label: 'Nombre del Servicio', name: 'nombre', type: 'text' },
      { label: 'Descripción', name: 'descripcion', type: 'text' },
      { label: 'Duración (horas)', name: 'duracion', type: 'number' },
    ],
    usuarios: [
      { label: 'Nombre de Usuario', name: 'nombre', type: 'text' },
      { label: 'Correo Electrónico', name: 'email', type: 'email' },
      { label: 'Contraseña', name: 'password', type: 'password' },
    ],
    ofertas: [
      { label: 'Título de la Oferta', name: 'titulo', type: 'text' },
      { label: 'Descripción', name: 'descripcion', type: 'text' },
      { label: 'Fecha de Expiración', name: 'fechaExpiracion', type: 'date' },
    ],
    contenido: [
      { label: 'Título', name: 'titulo', type: 'text' },
      { label: 'Descripción', name: 'descripcion', type: 'text' },
    ],
  };

  const imageUrls = {
    productos: 'https://via.placeholder.com/150?text=Producto',
    servicios: 'https://via.placeholder.com/150?text=Servicio',
    usuarios: 'https://via.placeholder.com/150?text=Usuario',
    ofertas: 'https://via.placeholder.com/150?text=Oferta',
    contenido: 'https://via.placeholder.com/150?text=Contenido',
  };

  if (!resourceFields[resource]) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6">
      <CRUDForm
        resourceName={resource.charAt(0).toUpperCase() + resource.slice(1)}
        fields={resourceFields[resource]}
        onSubmit={handleSubmit}
        imageUrl={imageUrls[resource]}
      />
    </div>
  );
};

export default AdminCRUD;

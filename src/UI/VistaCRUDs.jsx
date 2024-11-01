import React, { useState } from 'react';
import FormProducto from '../forms/AñadirProducto';
import FormEditarProducto from '../forms/EditarProducto';
import FormEliminarProducto from '../forms/EliminarProducto';
import FormContenido from '../forms/AñadirContenido';
import FormEditarContenido from '../forms/EditarContenido';
import FormEliminarContenido from '../forms/EliminarContenido';
import AnadirOferta from '../forms/AnadirOferta';
import EditarOferta from '../forms/EditarOferta';
import EliminarOferta from '../forms/EliminarOferta';
import FormCrearAdmin from '../forms/FormCrearAdmin';
import FormEditarAdmin from '../forms/FormEditarAdmin';
import FormEliminarAdmin from '../forms/FormEliminarAdmin';
import Footer from './Footer';
import CrudCard from './CRUDCard';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedContenido, setSelectedContenido] = useState(null);
  const [formType, setFormType] = useState('');

  const handleAddProduct = () => {
    setIsAdding(true);
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedProduct(null);
    setFormType('producto');
  };

  const handleEditProduct = (productData) => {
    setSelectedProduct(productData);
    setIsEditing(true);
    setIsDeleting(false);
    setIsAdding(false);
    setFormType('productoEdit');
  };

  const handleDeleteProduct = () => {
    setIsDeleting(true);
    setIsEditing(false);
    setIsAdding(false);
    setFormType('productoDelete');
  };

  const handleCloseForms = () => {
    setIsAdding(false);
    setIsEditing(false);
    setIsDeleting(false);
   
  };

  const handleAddUser = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedProduct(null);
    setFormType('usuario');
  };

  const handleEditUser = (userData) => {
    setSelectedAdmin(userData);
    setIsEditing(true);
    setIsAdding(false);
    setIsDeleting(false);
    setFormType('usuarioEdit');
};

const handleDeleteUser = (userData) => {
    setSelectedAdmin(userData);
    setIsDeleting(true);
    setIsEditing(false);
    setIsAdding(false);
    setFormType('usuarioDelete');
};

  const handleAddContenido= () => {
    setIsAdding(true);
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedProduct(null);
    setFormType('contenido');
  };

  const handleEditContenido = (contenidoData) => {
    setSelectedContenido(contenidoData);
    setIsEditing(true);
    setIsDeleting(false);
    setIsAdding(false);
    setFormType('contenidoEdit');
  };

  const handleDeleteContenido = () => {
    setIsDeleting(true);
    setIsEditing(false);
    setIsAdding(false);
    setFormType('contenidoDelete');
  };

 
  const handleAnadirOferta = () => {setIsAdding(true);setIsEditing(false);setIsDeleting(false);setFormType('ofertaAdd');}
  const handleEditarOferta = () => {setIsAdding(false);setIsEditing(true);setIsDeleting(false);setFormType('ofertaEdit');}
  const handleEliminarOferta = () => {setIsAdding(false);setIsEditing(false);setIsDeleting(true);setFormType('ofertaDelete');}

 
  const sampleProduct = {
    nombre: 'Producto Ejemplo',
    marca: 'Marca Ejemplo',
    especificacion: 'Especificación Ejemplo',
    subcategoria: 'Subcategoría Ejemplo',
    categoria: 'Categoría Ejemplo',
    modelo: 'Modelo Ejemplo',
    precio: 100,
    cantidad: 10,
    destacado: true,
  };

  
  const sampleUser = {
    nombre: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    rol: 'Admin',
  };
  const sampleContenido={
    titulo:'xd',
    descripcion:'xd',
    video_incrustado:'xd'
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
       <Navbar />
      

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mt-16">
        <CrudCard
          title="Productos"
          onAdd={handleAddProduct}
          onEdit={() => handleEditProduct(sampleProduct)}
          onDelete={handleDeleteProduct}
        />
        <CrudCard
          title="Usuarios"
          onAdd={handleAddUser}
          onEdit={() => handleEditUser(sampleUser)}
          onDelete={handleDeleteUser}
        />
        <CrudCard
          title="Contenido"
          onAdd={handleAddContenido}
          onEdit={() => handleEditContenido(sampleContenido)}
          onDelete={handleDeleteContenido}
        />
        <CrudCard
          title="Ofertas"
          onAdd={(handleAnadirOferta)}
          onEdit={(handleEditarOferta)}
          onDelete={(handleEliminarOferta)}
        />
      
      </div>

{isAdding && formType === 'producto' && <FormProducto onClose={handleCloseForms} />}
{isEditing && formType === 'productoEdit' && <FormEditarProducto productoData={selectedProduct} onClose={handleCloseForms} />}
{isDeleting && formType === 'productoDelete' && <FormEliminarProducto onClose={handleCloseForms} />}

{isAdding && formType === 'contenido' && <FormContenido onClose={handleCloseForms} />}
{isEditing && formType === 'contenidoEdit' && <FormEditarContenido contenidoData={selectedContenido} onClose={handleCloseForms} />}
{isDeleting && formType === 'contenidoDelete' && <FormEliminarContenido onClose={handleCloseForms} />}

{isAdding && formType === 'ofertaAdd' && <AnadirOferta onClose={handleCloseForms} />}
{isEditing && formType === 'ofertaEdit' && <EditarOferta onClose={handleCloseForms} />}
{isDeleting && formType === 'ofertaDelete' && <EliminarOferta onClose={handleCloseForms} />}

{isAdding && formType === 'usuario' && <FormCrearAdmin onClose={handleCloseForms} />}
{isEditing && formType === 'usuarioEdit' && <FormEditarAdmin adminData={selectedAdmin} onClose={handleCloseForms} />}
{isDeleting && formType === 'usuarioDelete' && <FormEliminarAdmin adminData={selectedAdmin} onClose={handleCloseForms} />}
<Footer />
    </div>
  );
};

export default AdminDashboard;
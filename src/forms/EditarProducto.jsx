import React, { useEffect, useRef, useState } from 'react';
import { useUpdateProducto } from '../../hooks/hooksProductos/useUpdateProducto.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductoDetallado }from '../../hooks/hooksProductos/FetchProductoDetallado.js'
import Navbar from '../UI/Navbar.jsx';

const FormEditarProducto = () => {

  const {id} = useParams();
  const { update } = useUpdateProducto();
  const [imagen, setImagen] = useState();
  const inputFile = useRef(null);
  const navegar = useNavigate();
  const {producto, isLoading, error} = useFetchProductoDetallado(id);

  const [productoDetallado, setProductoDetallado] = useState({
    id: '',
    nombre: '',
    marca: '',
    especificacion: '',
    subcategoria: '',
    categoria: '',
    modelo: '',
    precio: '',
    imagen: null,
    cantidad: '',
    destacado: false,
  });

  if(error) { return <div>{error}</div>}

  useEffect(() => {
    if (!isLoading) {
      
      setProductoDetallado({
        nombre: producto.nombre,
        marca: producto.marca,
        especificacion: producto.especificacion,
        subcategoria: producto.subcategoria,
        categoria: producto.categoria,
        modelo: producto.modelo,
        precio: producto.precio,
        imagen: null,
        cantidad: producto.cantidad,
        destacado: producto.destacado,
      });
    }
  }, [isLoading, producto]); 


  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleChange = (e) => {
   
    const { name, value, type, checked, files } = e.target;
    setProductoDetallado({
      ...productoDetallado,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });

    const datos = new FileReader();

    if(e.target.files != null || e.target.files != undefined){
      datos.addEventListener('load',() => {
        setImagen(datos.result);
      })
      datos.readAsDataURL(e.target.files[0]);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(
      id,
      productoDetallado.nombre,
      productoDetallado.marca,
      productoDetallado.especificacion,
      productoDetallado.subcategoria,
      productoDetallado.categoria,
      productoDetallado.modelo,
      productoDetallado.precio,
      imagen,
      '1111',
      productoDetallado.cantidad,
      productoDetallado.destacado,
    );

    setProductoDetallado(
      {
        nombre: '',
        marca: '',
        especificacion: '',
        subcategoria: '',
        categoria: '',
        modelo: '',
        precio: '',
        imagen: null,
        cantidad: '',
        destacado: false,
      } 
    );

    if(inputFile.current){
      inputFile.current.value = '';
      inputFile.current.type = 'text';
      inputFile.current.type = 'file';
    }
    setTimeout(() => {
      window.location.replace('');
    },500)
    navegar('/gestionar-productos')
  };
   
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">

      <div className="relative w-full max-w-4xl mx-4">

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold mb-6 text-center">Editar Producto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="mb-4">
              <label className="block text-gray-700">Nombre del Producto</label>
              <input
                type="text"
                name="nombre"
                id='nombre'
                value={productoDetallado.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Marca</label>
              <input
                type="text"
                name="marca"
                id='marca'
                value={productoDetallado.marca}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700">Especificación</label>
              <textarea
                name="especificacion"
                id='especificacion'
                value={productoDetallado.especificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>
            </div>

           
            <div className="mb-4">
              <label className="block text-gray-700">Subcategoría</label>
              <input
                type="text"
                name="subcategoria"
                id='subcategoria'
                value={productoDetallado.subcategoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Categoría</label>
              <input
                type="text"
                name="categoria"
                id='categoria'
                value={productoDetallado.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Modelo</label>
              <input
                type="text"
                name="modelo"
                id='modelo'
                value={productoDetallado.modelo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            
            <div className="mb-4">
              <label className="block text-gray-700">Precio</label>
              <input
                type="number"
                name="precio"
                id='precio'
                value={productoDetallado.precio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Imagen</label>
              <input
                type="file"
                name="imagen"
                id='imagen'
                accept="image/*"
                ref={inputFile}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-gray-700">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                id='cantidad'
                value={productoDetallado.cantidad}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4 flex items-center md:col-span-2">
              <input
                type="checkbox"
                name="destacado"
                id='destacado'
                checked={productoDetallado.destacado}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">¿Es destacado?</label>
            </div>
          </div>

          <button type="submit" className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition w-full">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEditarProducto;

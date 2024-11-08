import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFetchProductoDetallado } from '../../hooks/FetchProductoDetallado.js';
import Navbar from './Navbar.jsx';
import { CartContext } from '../UI/prueba_carrito.jsx';
import Footer from "./Footer.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function DetalleProducto() {
  const { id } = useParams();
  const { producto, isLoading, error } = useFetchProductoDetallado(id);
  const { addToCart } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);

  if (isLoading) return <p className="text-center text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!producto) return <p className="text-center">Producto no encontrado</p>;

  const numericPrice = typeof producto.precio === 'number'
    ? producto.precio
    : parseFloat(producto.precio.replace(/[^\d.-]/g, ''));

  const precioConDescuento = producto.descuento
    ? numericPrice * (1 - producto.descuento / 100)
    : numericPrice;

  const formatearPrecio = (precio) => {
    return precio.toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isNaN(numericPrice)) {
      console.error("Precio inválido");
      return;
    }

    addToCart(producto);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const hayExistencias = (cantidad) => cantidad !== 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-10">
        <div className="bg-white p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <img
            className="w-full h-auto mx-auto max-w-sm md:max-w-md rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            src={producto.imagen}
            alt={producto.marca}
          />
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-primary font-bold text-3xl">{producto.nombre}</h1>
            <p className="font-primary text-lg text-gray">{producto.especificacion}</p>
            <p className="font-primary text-lg text-gray">{hayExistencias(producto.cantidad) ? 'Hay disponibilidad' : 'Esperando Reposición'}</p>
            
            {/* Mostrar precio con o sin descuento */}
            {producto.descuento ? (
              <div>
                <p className="font-primary text-lg text-gray line-through">{formatearPrecio(numericPrice)}</p>
                <p className="font-primary text-2xl font-semibold text-red-600">{formatearPrecio(precioConDescuento)}</p>
                <span className="text-sm font-bold px-2 py-1 rounded-md bg-red-100 text-red">
                  {producto.descuento}% de descuento (IVAI)
                </span>
              </div>
            ) : (
              <p className="font-primary text-2xl font-semibold text-old">{formatearPrecio(numericPrice)} (IVAI)</p>
            )}

            <button
              onClick={handleAddToCart}
              className="mt-4 px-6 py-3 bg-red text-white font-bold rounded-lg shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
      
      <WhatsAppButton message="¡Hola! Estoy interesado/a en obtener más información sobre el producto..." />
      <Footer />
    </div>
  );
}

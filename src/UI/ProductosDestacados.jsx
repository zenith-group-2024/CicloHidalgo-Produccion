import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from './prueba_carrito';
import { useFetchDestacados } from '../../hooks/useFetchDestacados';
import '../index.css';

const ProductosDestacados = () => {
  const carouselRef = useRef(null);
  const { productosDestacados, isLoading, error } = useFetchDestacados();
  const { addToCart } = useContext(CartContext);

  if (isLoading) return <p>Cargando productos destacados...</p>;
  if (error) return <p>Error: {error}</p>;

  const productosDuplicados = [...productosDestacados, ...productosDestacados];

  const handleAddToCart = (e, producto) => {
    e.stopPropagation();

    const numericPrice = typeof producto.precio === 'number' ? producto.precio : parseFloat(producto.precio.replace(/[^\d.-]/g, ''));

    if (isNaN(numericPrice)) {
      console.error("Precio inválido");
      return;
    }

    addToCart(producto);
  };

  return (
    <section className="bg-white">
      <h1 className="text-3xl font-bold mb-6 mt-20 text-center font-primary">Productos Destacados</h1>
      <div className="carousel-container">
        <div ref={carouselRef} className="carousel">
          {productosDuplicados.map((producto, index) => (
            <div key={`${producto.name}-${index}`} className="inline-block p-4">
              <motion.div
                className="rounded-lg shadow-lg overflow-hidden h-[350px] w-[300px] transition-transform transform m-2 bg-white flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/producto/${producto.id}`}>
                  <div>
                    <div className="w-full h-[200px] flex justify-center items-center">
                      <img
                        src={producto.imagen}
                        alt={producto.marca}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="p-3 flex flex-col h-full">
                      <h2 className="text-lg font-bold mb-1 text-black flex-grow">{producto.nombre}</h2>
                      <p className="text-xl text-gray">{`₡ ${producto.precio}`}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-center mt-auto mb-8">
                  <button
                    onClick={(e) => handleAddToCart(e, producto)}
                    className="px-4 py-2 bg-red text-white rounded-lg shadow-md transition duration-200 ease-in-out hover:scale-105"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductosDestacados;
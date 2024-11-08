import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import { CartContext } from '../UI/prueba_carrito';

export const Card = ({ producto }) => {
  const { addToCart, message, showMessage } = useContext(CartContext);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const formatearPrecio = (precio) => {
    return precio.toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const precioConDescuento = producto.descuento
  ? Math.round(producto.precio * (1 - producto.descuento / 100))
  : producto.precio;
  
  return (
    <motion.div
      ref={ref}
      className="relative group container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-white"
    >
      <Link to={`/producto/${producto.id}`}>
        <div className="flex-grow flex flex-col">
          <div className="w-full h-48 flex justify-center items-center">
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="max-h-full max-w-full object-contain" 
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <h1 className="font-primary font-semibold text-lg text-black mt-2">{producto.nombre}</h1>
            {/* Mostrar el precio original y el precio con descuento */}
            {producto.descuento ? (
              <div className="">
                <h2 className="font-primary font-light text-md line-through text-gray-500">
                  {formatearPrecio(producto.precio)}
                </h2>
                <h2 className="font-primary font-semibold text-md">
                  {formatearPrecio(precioConDescuento)}
                </h2>
                <span className="text-sm font-bold px-2 py-1 rounded-md">
                  {producto.descuento}% de descuento
                </span>
              </div>
            ) : (
              <h2 className="font-primary font-light text-md text-black">
                {formatearPrecio(producto.precio)}
              </h2>
            )}
          </div>
        </div>
      </Link>

   
      <button
        onClick={() => addToCart(producto)}
        className="absolute bottom-4 right-4 bg-red text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden xl:block"
      >
        Añadir al carrito
      </button>

      
      <button
        onClick={() => addToCart(producto)}
        className="bg-red text-white font-medium py-2 px-4 mt-4 rounded-lg shadow-md hover:bg-blue-600 xl:hidden ml-auto"
      >
        Añadir al carrito
      </button>
    </motion.div>
  );
};

export default Card;
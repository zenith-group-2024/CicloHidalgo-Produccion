import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from './prueba_carrito';
import { useFetchProductoDetallado } from '../../hooks/FetchProductoDetallado.js';

const CardDestacado = ({ nombre, title, precio, img, id, pauseCarousel, resumeCarousel }) => {
    const { addToCart } = useContext(CartContext);
    const { producto } = useFetchProductoDetallado(id);
    

    const handleAddToCart = (e) => {
        e.stopPropagation();

        const numericPrice = typeof producto.precio === 'number'
            ? producto.precio
            : parseFloat(producto.precio.replace(/[^\d.-]/g, ''));

        if (isNaN(numericPrice)) {
            console.error("Precio inválido");
            return;
        }

        addToCart(producto);
    };

    const numericPrice = typeof precio === 'number' ? precio : parseFloat(precio.replace(/[^\d.-]/g, ''));
    const formattedPrice = isNaN(numericPrice)
        ? "Precio no disponible"
        : numericPrice.toLocaleString("es-CR", {
            style: "currency",
            currency: "CRC",
            minimumFractionDigits: 2,
        });

    return (
        <motion.div
            className="rounded-lg shadow-lg overflow-hidden h-[350px] w-[300px] transition-transform transform  m-2 bg-white flex flex-col justify-between"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
        >
            <Link to={`/producto/${id}`}>
                <div>
                    <div className="w-full h-[200px] flex justify-center items-center">
                        <img
                            src={img}
                            alt={title}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <div className="p-3 flex flex-col h-full">
                        <h2 className="text-lg font-bold mb-1 text-black flex-grow">{nombre}</h2>
                        <p className="text-xl text-gray">{formattedPrice}</p>
                    </div>
                </div>
            </Link>
            <div className="flex justify-center mt-auto mb-8">
                <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-red text-white rounded-lg shadow-md transition duration-200 ease-in-out hover:scale-105"
                >
                    Agregar al Carrito
                </button>
            </div>
        </motion.div>
    );
};

export default CardDestacado;

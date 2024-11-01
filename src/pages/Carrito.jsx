import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../UI/Navbar.jsx";
import { CartContext } from '../UI/prueba_carrito.jsx';
import { Link } from "react-router-dom";
import { Trash, SquarePlus, SquareMinus } from 'lucide-react';
import Footer from '../UI/Footer.jsx';
import { GlobalContext } from "../global/GlobalState.jsx";

export const Carrito = () => {
  const { state } = useContext(GlobalContext);
  const { cart, setCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const getTotalProducts = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0).toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 2,
    });
  };

  const handleEmptyCart = () => {
    setShowModal(true); 
  };

  const confirmEmptyCart = () => {
    setCart([]);
    setShowModal(false); 
  };

  const handleRemoveProduct = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const producto = cart[index];
    const newQuantity = producto.quantity + 1;

    if (newQuantity > producto.cantidad) {
      alert("No hay suficiente stock para este producto");
      return;
    }

    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity};
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    
      return navigate("/Orden");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gray-800 font-primary font-bold text-3xl">Tus compras</h1>
          <Link
            to="/Productos"
            className="inline-block px-5 py-3 bg-red text-white font-semibold rounded-lg hover:bg-red-600 transition-shadow duration-300 shadow-md"
          >
            Añadir más productos
          </Link>
        </div>

        {/* Header de Categorías */}
        <div className="hidden md:grid grid-cols-3 text-center mb-4 bg-gray p-4 rounded-lg shadow-lg">
          <h2 className="font-secondary font-semibold text-xl text-white">Producto</h2>
          <h2 className="font-secondary font-semibold text-xl text-white">Cantidad</h2>
          <h2 className="font-secondary font-semibold text-xl text-white">Subtotal</h2>
        </div>

        {/* Productos */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-600 font-medium">No has agregado productos al carrito.</p>
        ) : (
          cart.map((producto, index) => (
            <div
              key={index}
              className="container mx-auto p-5 shadow-lg rounded-lg bg-white mb-4 md:grid md:grid-cols-3 md:items-center"
            >
              {/* Sección Producto */}
              <div className="flex flex-col items-center md:flex-row md:items-center lg:mx-auto md:justify-start">
                <img
                  className="w-24 h-24 object-contain rounded-lg shadow-lg mx-auto md:mr-6"
                  src={producto.imagen} 
                  alt={producto.title}
                />
                <h3 className="font-primary font-semibold text-lg text-gray-800 mt-2 md:mt-0">{producto.title}</h3>
              </div>
              
              {/* Sección Cantidad */}
              <div className="flex items-center justify-center mt-4 md:mt-0">
                <button
                  onClick={() => handleDecreaseQuantity(index)}
                  className="mr-2 px-1 py-1 transition-all duration-300 flex items-center bg-gray-300 rounded-full shadow-md hover:bg-red"
                >
                  <SquareMinus className="h-4 w-4" />
                </button>
                <p className="font-primary font-semibold text-lg text-gray-800 text-center">{producto.quantity}</p>
                <button
                  onClick={() => handleIncreaseQuantity(index)}
                  className="ml-2 px-1 py-1 transition-all duration-300 flex items-center bg-gray-300 rounded-full shadow-md hover:bg-red"
                >
                  <SquarePlus className="h-4 w-4" />
                </button>
              </div>
              
              {/* Sección Subtotal */}
              <div className="flex items-center justify-center mt-4 md:mt-0">
                <p className="font-primary font-semibold text-lg text-gray-800 text-center">
                  {`${(producto.precio * producto.quantity).toLocaleString("es-CR", {
                    style: "currency",
                    currency: "CRC",
                    minimumFractionDigits: 2,
                  })}`}
                </p>
                <button
                  onClick={() => handleRemoveProduct(index)}
                  className="ml-4 px-3 py-2 transition-all duration-300 rounded-full bg-gray-300 hover:bg-red shadow-md"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <h3 className="font-primary font-semibold text-2xl text-gray-800 mb-4 md:mb-0">
              Total: <span>{getTotal()}</span>
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={handleEmptyCart}
                className="px-4 py-2 bg-gray text-white rounded-lg transition-shadow duration-300 shadow-md"
              >
                Vaciar Carrito
              </button>

              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-red text-white rounded-lg font-semibold transition-shadow duration-300 shadow-md"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl z-50 text-center">
            <h2 className="text-xl font-semibold mb-4">¿Estás seguro de que deseas vaciar el carrito?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmEmptyCart}
                className="px-4 py-2 bg-gray text-white rounded-lg shadow-md"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red text-white  rounded-lg shadow-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

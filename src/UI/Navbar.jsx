import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, UserCheck, UserRound, AlignJustify, X, Home, FileText, Box, Briefcase } from 'lucide-react';
import { GlobalContext } from '../global/GlobalState.jsx';
import LoginForm from '../forms/Login.jsx';
import logo from '../assets/images/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from './prueba_carrito.jsx';

const Navbar = () => {
  const { state, logout } = useContext(GlobalContext);
  const { isAuthenticated, isAdmin } = state;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, message, showMessage } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ? 'font-bold text-red' : 'font-regular';

  return (
    <nav className="bg-white p-4 w-full flex flex-col md:flex-row lg:justify-between items-center z-50 shadow-lg">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="transform transition-transform duration-300 hover:scale-105">
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto m-2 transition-all duration-300 ease-in-out"
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          <AlignJustify size={28} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed inset-0 z-40 flex justify-end bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-3/4 sm:w-1/2 max-w-sm bg-white h-full shadow-2xl rounded-l-lg p-6 transform transition-transform duration-300">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-gray hover:text-red-500 transition duration-300">
                <X size={24} />
              </button>
              <div className="flex flex-col items-start space-y-6 mt-12 text-lg font-medium text-gray-800">
                <img src={logo} alt="logo" className="h-10 mb-6 mx-auto" />
                <hr className="border-gray-200 w-full" />
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 transition duration-200">
                  <Home size={20} />
                  <span className={`${isActive('/')}`}>Inicio</span>
                </Link>
                <Link to="/Productos" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 transition duration-200">
                  <Box size={20} />
                  <span className={`${isActive('/Productos')}`}>Productos</span>
                </Link>
                <Link to="/Contenido" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 transition duration-200">
                  <FileText size={20} />
                  <span className={`${isActive('/Contenido')}`}>Contenido</span>
                </Link>
                <Link to="/Servicios" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 transition duration-200">
                  <Briefcase size={20} />
                  <span className={`${isActive('/Servicios')}`}>Servicios</span>
                </Link>
                {isAdmin && (
                  <>
                    <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 transition duration-200">
                      <Box size={20} />
                      <span className={`${isActive('/admin-dashboard')}`}>Admin CRUD</span>
                    </Link>
                    <Link to="/Dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 transition duration-200">
                      <Box size={20} />
                      <span className={`${isActive('/Dashboard')}`}>Dashboard</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex flex-grow justify-center xl:space-x-10 lg:space-x-8 md:space-x-4">
        <Link
          to="/"
          className={`${isActive('/')} font-primary font-semibold lg:text-lg md:text-base transform transition-transform duration-300 hover:scale-110`}
        >
          Inicio
        </Link>
        <Link
          to="/Productos"
          className={`${isActive('/Productos')} font-primary font-semibold lg:text-lg md:text-base transform transition-transform duration-300 hover:scale-110`}
        >
          Productos
        </Link>
        <Link
          to="/Contenido"
          className={`${isActive('/Contenido')} font-primary font-semibold lg:text-lg md:text-base transform transition-transform duration-300 hover:scale-110`}
        >
          Contenido
        </Link>
        <Link
          to="/Servicios"
          className={`${isActive('/Servicios')} font-primary font-semibold lg:text-lg md:text-base transform transition-transform duration-300 hover:scale-110`}
        >
          Servicios
        </Link>
      </div>

      <div className="flex lg:space-x-4 md:space-x-2 m-4 md:ml-4 relative">
        {!isAdmin && (
          <div className="relative group flex items-center">
            <Link to="/Carrito" className="relative flex items-center transform transition-transform duration-300 hover:scale-110">
              <ShoppingCart className="w-7 h-7 text-gray-700" />
              {cartCount > 0 && (
                <span className="lg:absolute lg:-top-2 lg:-right-2 bg-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="absolute -top-5 left-1 transform -translate-x-1/2 bg-gray text-white text-xs font-medium rounded-md px-3 py-1 shadow-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-in-out whitespace-nowrap">
              Ir a mi carrito
            </div>
            {showMessage && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 mb-12 bg-red text-white p-2 rounded shadow-lg text-xl z-50 transition-opacity duration-300">
                {message}
              </div>
            )}
          </div>
        )}

        {isAuthenticated ? (
          <div className="relative group flex items-center">
            <Link to="/MenuPerfil" className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              <UserCheck className="w-7 h-7 mt-1 text-gray-700" />
            </Link>
            <div className="absolute -top-5 left-1 transform -translate-x-1/2 bg-gray text-white text-xs font-medium rounded-md px-3 py-1 shadow-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-in-out whitespace-nowrap">
              Ir a mi perfil
            </div>
          </div>
        ) : (
          <div onClick={() => setIsAuthModalOpen(true)} className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
            <UserRound className="w-7 h-7 mt-1 text-gray-700" />
          </div>
        )}
      </div>

      {isAuthModalOpen && <LoginForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
    </nav>
  );
};

export default Navbar;
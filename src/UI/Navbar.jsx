import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, UserCheck, UserRound, AlignJustify, X } from 'lucide-react';
import { GlobalContext } from '../global/GlobalState.jsx';
import LoginForm from '../forms/Login.jsx';
import logo from '../assets/images/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../UI/prueba_carrito.jsx';

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

  return (
    <nav className="bg-white p-4 w-full flex flex-col md:flex-row lg:justify-between items-center border-b-2 border-black border-opacity-50 z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className={`transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/' ? 'text-red' : ''}`}>
          <img src={logo} alt="logo" className="lg:h-16 md:h-14 m-4" />
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-black focus:outline-none"
        >
          <AlignJustify size={28} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 w-full bg-white h-full shadow-lg rounded-lg"
            >
              <button onClick={() => setIsMenuOpen(false)} className="text-black hover:text-red mb-4 absolute top-4 right-4">
                <X size={24} />
              </button>
              <div className="flex flex-col space-y-4 font-bold text-2xl">
                <img src={logo} alt="logo" className="lg:h-10 md:h-10 mx-auto mt-4" />
                <hr className="border-old" />
                <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-black ml-2 ${location.pathname === '/' ? 'text-red' : ''}`}>
                  Inicio
                </Link>
                <Link to="/Productos" onClick={() => setIsMenuOpen(false)} className={`text-black ml-2 ${location.pathname === '/Productos' ? 'text-red' : ''}`}>
                  Productos
                </Link>
                <Link to="/Contenido" onClick={() => setIsMenuOpen(false)} className={`text-black ml-2 ${location.pathname === '/Contenido' ? 'text-red' : ''}`}>
                  Contenido
                </Link>
                <Link to="/Servicios" onClick={() => setIsMenuOpen(false)} className={`text-black ml-2 ${location.pathname === '/Servicios' ? 'text-red' : ''}`}>
                  Servicios
                </Link>
                {isAdmin && (
                  <>
                    <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} className={`text-black ml-2 ${location.pathname === '/admin-dashboard' ? 'text-red' : ''}`}>
                      Admin CRUD
                    </Link>
                    <Link to="/Dashboard" onClick={() => setIsMenuOpen(false)} className={`text-black ml-2 ${location.pathname === '/Dashboard' ? 'text-red' : ''}`}>
                      Dashboard
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex flex-grow justify-center xl:space-x-10 lg:space-x-8 md:space-x-4">
        <Link to="/" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/' ? 'text-red' : ''}`}>
          Inicio
        </Link>
        <Link to="/Productos" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Productos' ? 'text-red' : ''}`}>
          Productos
        </Link>
        <Link to="/Contenido" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Contenido' ? 'text-red' : ''}`}>
          Contenido
        </Link>
        <Link to="/Servicios" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Servicios' ? 'text-red' : ''}`}>
          Servicios
        </Link>
        {isAdmin && (
          <Link to="/admin-dashboard" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/admin-dashboard' ? 'text-red' : ''}`}>
            Admin CRUD
          </Link>
        )}
        {isAdmin && (
          <Link to="/Dashboard" className={`text-black font-primary font-bold lg:text-lg md:text-base hover:text-gray transform transition-transform duration-300 hover:scale-110 ${location.pathname === '/Dashboard' ? 'text-red' : ''}`}>
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex lg:space-x-4 md:space-x-2 m-4 md:ml-4 relative">
        <Link to="/Carrito" className="relative flex items-center">
          <ShoppingCart className="w-7 h-7 transform transition-transform duration-300 hover:scale-110" />
          {cartCount > 0 && (
            <span className="lg:absolute lg:-top-2 lg:-right-2">
              <span className="bg-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            </span>
          )}
        </Link>
        {showMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 mb-12 bg-red text-white p-2 rounded shadow-lg text-xl z-50 transition-opacity duration-300">
            {message}
          </div>
        )}
        {isAuthenticated ? (
          <Link to="/MenuPerfil" className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
            <UserCheck className="w-7 h-7 mt-1" />
          </Link>
        ) : (
          <div onClick={() => setIsAuthModalOpen(true)} className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
            <UserRound className="w-7 h-7 mt-1" />
          </div>
        )}
      </div>

      {isAuthModalOpen && <LoginForm isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />}
    </nav>
  );
};

export default Navbar;

import React, { useState, useContext, useEffect } from 'react';
import { useLogin } from '../../hooks/UseLogin.js';
import { X, Eye, EyeOff } from 'lucide-react'; 
import Registro from './Registro.jsx';
import Recuperacion_contraseña from './Recuperacion_contrasena.jsx';
import { GlobalContext } from '../global/GlobalState.jsx'; 
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ isOpen, onClose }) => {
  const { login, isLoading, userId } = useLogin(); 
  const { state = {}, setToken, logout } = useContext(GlobalContext);
  const { isAuthenticated = false } = state; 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showRegistro, setShowRegistro] = useState(false);
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(''); 
    try {
      const result = await login(email, password); 
      const { token, userId, admin } = result; 
  
      localStorage.setItem('authToken', token); 
      localStorage.setItem('userId', userId); 
      setToken(token, userId, admin); 
      setEmail('');
      setPassword('');
      onClose();
    } catch (e) {
      setErrorMessage(e.message); 
      console.log(e.message); 
    }
  };

  const handleRegisterClick = () => {
    setShowRegistro(true);
  };

  const handlePasswordRecoveryClick = () => {
    setShowPasswordRecovery(true);
  };

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); 
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(''); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Cerrar</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 text-black">Login</h2>

            {errorMessage && <p className="text-red font-primary font-semibold text-center">{errorMessage}</p>}

            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} 
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-red text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? 'Cargando...' : 'Login'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p>Estás autenticado.</p>
                <button onClick={handleLogout} className="mt-4 text-red underline">
                  Cerrar sesión
                </button>
              </div>
            )}

            <p className="mt-4 text-center text-gray-600">
              No tienes una cuenta?{' '}
              <button onClick={handleRegisterClick} className="text-red underline">
                Regístrate aquí
              </button>
            </p>
            <p className="mt-4 text-center text-gray-600">
              ¿Olvidaste tu contraseña?{' '}
              <button onClick={handlePasswordRecoveryClick} className="text-red underline">
                Recuperación de contraseña
              </button>
            </p>
          </div>
        </div>
      )}
      {showRegistro && <Registro />}
      {showPasswordRecovery && <Recuperacion_contraseña onClose={() => setShowPasswordRecovery(false)} />} {/* Modal de recuperación */}
    </>
  );
};

export default LoginForm;
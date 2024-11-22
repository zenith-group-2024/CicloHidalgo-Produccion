import React, { useState } from 'react';
import { X } from 'lucide-react';
import useEnvioEmailContrasena from '../../hooks/hooksUsuario/useEnvioEmailContrasena';

const Recuperacion_contraseña = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const { handleEnvioEmailContrasena, isSending, error, successMessage } = useEnvioEmailContrasena();
  const handleSendLink = async (e) => {
    e.preventDefault();
    await handleEnvioEmailContrasena(email);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="w-6 h-6" />
          <span className="sr-only">Cerrar</span>
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-black">Recuperación de Contraseña</h2>
        
        <p className="text-center text-gray-600 mb-6">
          Ingrese su correo electrónico para enviarle un enlace de recuperación de contraseña.
        </p>

        <form onSubmit={handleSendLink} className="space-y-4">
          <div>
            <label htmlFor="recoveryEmail" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="recoveryEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 px-4 bg-red text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSending ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-600 text-center font-semibold">
            {successMessage}
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-600 text-center font-semibold">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Recuperacion_contraseña;
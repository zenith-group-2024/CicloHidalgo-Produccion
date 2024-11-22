import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRegistro } from '../../hooks/hooksUsuario/UseRegistro';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Registro = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [cumpleanos, setCumpleanos] = useState('');
  const [password, setPassword] = useState('');
  const [boletin, setBoletin] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); 


  const { register, isLoading, errorMessage, setErrorMessage } = useRegistro();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const isRegistered = await register(
        email,
        password,
        nombre,
        direccion,
        cumpleanos,
        contacto,
        boletin
      );

      if (isRegistered) {
        setSuccessMessage('¡Usuario creado exitosamente!');
        setTimeout(() => {
          closeModal();
        }, 2000); 
        setNombre('');
        setContacto('');
        setDireccion('');
        setEmail('');
        setCumpleanos('');
        setPassword('');
        setBoletin(false);
      }
    } catch (error) {
      console.log('Error capturado en handleSubmit:', error.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) onClose();
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
          <div className="relative bg-white p-8  rounded-lg shadow-xl w-full max-w-md  mx-4 my-8">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Cerrar</span>
            </button>

            <h2 className="text-2xl font-bold text-center mb-2 text-black">Registro</h2>
            {successMessage ? (
              <p className="text-blue text-center font-medium">{successMessage}</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
               
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contacto" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <PhoneInput
                    country={'cr'}
                    value={contacto}
                    onChange={setContacto}
                    inputClass="w-full p-2 border border-gray-300 rounded-md"
                    containerClass="w-full"
                    specialLabel=""
                    inputStyle={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

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
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cumpleanos" className="block text-sm font-medium text-gray-700">
                    Cumpleaños
                  </label>
                  <input
                    type="date"
                    id="cumpleanos"
                    value={cumpleanos}
                    onChange={(e) => setCumpleanos(e.target.value)}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="boletin"
                    checked={boletin}
                    onChange={(e) => setBoletin(e.target.checked)}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="boletin" className="ml-2 block text-sm text-gray-700">
                    Deseo recibir ofertas especiales
                  </label>
                </div>

                {errorMessage && (
                  <p className="text-red font-primary font-semibold text-center">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 px-4 bg-red text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Registro;

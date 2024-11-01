import { useState, useContext } from 'react';
import { GlobalContext } from '../src/global/GlobalState.jsx';

export const useCrearAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useContext(GlobalContext);

  const crear = async (nombre, email, password, contacto, direccion, cumpleanos) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/admin/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          contacto,
          direccion,
          cumpleanos,
        }),
      });

      if (response.ok) {
        setMessage('Administrador creado correctamente');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.errors ? JSON.stringify(errorData.errors) : 'Error en la creación'}`);
      }
    } catch (error) {
      console.log(error);
      setMessage('Error en la conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    crear,
    message,
  };
};
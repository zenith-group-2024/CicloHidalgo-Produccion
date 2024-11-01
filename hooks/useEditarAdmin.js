import { useState } from 'react';

export const useEditarAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const editar = async (id, nombre, email, contacto, direccion, cumpleanos) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/update/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          contacto,
          direccion,
          cumpleanos,
        }),
      });

      if (response.ok) {
        setMessage('Administrador actualizado correctamente');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.errors ? JSON.stringify(errorData.errors) : 'Error en la actualización'}`);
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
    editar,
    message,
  };
};
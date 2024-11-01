import { useState } from 'react';

export const useEliminarAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const eliminar = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://ciclo-hidalgo-desarrollo.vercel.app/api/api/admin/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Administrador eliminado correctamente');
      } else {
        setMessage('Error al eliminar el administrador');
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
    eliminar,
    message,
  };
};
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegistro = () => {
  const [isLoading, setIsLoading] = useState(true);

  const register = async (email, password, nombre, direccion, cumpleanos, contacto, boletin ) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          direccion,
          cumpleanos,
          contacto,
          boletin,
        }),
      });
      const result = await response.json();
      console.log(result);
     
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    register,
  };
};

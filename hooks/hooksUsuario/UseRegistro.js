import { useState } from 'react';

export const useRegistro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (email, password, nombre, direccion, cumpleanos, contacto, boletin) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/user/signin', {
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

      if (!response.ok) {
        setErrorMessage(result.message || "Error en el registro.");
        return false;
      }

      return true;
    } catch (error) {
      setErrorMessage("Error de red o problema de conexión.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    register,
    setErrorMessage,
  };
};

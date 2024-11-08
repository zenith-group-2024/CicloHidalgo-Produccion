import { useState } from 'react';

const useEnvioEmailContrasena = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEnvioEmailContrasena = async (email) => {
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/enviar-correo-personalizado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al enviar el correo.');
      }

      setSuccessMessage('Se ha enviado un enlace a su correo electrónico para recuperar su contraseña.');
      setIsSending(false);
    } catch (err) {
      setError('Hubo un problema al enviar el correo. Por favor, inténtelo de nuevo.');
      setIsSending(false);
    }
  };

  return { handleEnvioEmailContrasena, isSending, error, successMessage };
};

export default useEnvioEmailContrasena;
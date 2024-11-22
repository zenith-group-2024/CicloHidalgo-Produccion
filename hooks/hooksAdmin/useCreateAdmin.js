import { useState } from 'react';

const useCreateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const createAdmin = async (adminData) => {
    setLoading(true);
    try {
      const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });

      if (!response.ok) throw new Error('Error al crear el administrador');

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createAdmin, loading, message, error };
};

export default useCreateAdmin;
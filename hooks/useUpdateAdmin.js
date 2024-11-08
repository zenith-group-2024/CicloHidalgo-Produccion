import { useState } from 'react';

const useUpdateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const updateAdmin = async (adminId, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/admin/update/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Error al actualizar el administrador');

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateAdmin, loading, message, error };
};

export default useUpdateAdmin;
import { useState, useEffect } from 'react';

const useFetchAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/admins');
      if (!response.ok) {
        throw new Error('Error al obtener los administradores');
      }
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { admins, loading, error, refetch };
};

export default useFetchAdmins;
import { useState, useEffect } from "react";

export const useFetchProductoDetallado = (id) => {
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducto = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}`);
      if (!response.ok) throw new Error('Error al obtener el producto');
      const result = await response.json();
      setProducto(result.producto);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProducto(id);
  }, [id]);

  return { producto, isLoading, error };
};

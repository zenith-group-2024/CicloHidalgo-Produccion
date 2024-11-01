import { useEffect, useState } from "react";

export const useFetchContenidos = () => {
  const [contenidos, setContenidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getContenidos = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contenidos/all');
      const result = await response.json();
      setContenidos(result.contenidos || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContenidos();
  }, []);

  return {
    contenidos,
    setContenidos, 
    isLoading,
    getContenidos,
  };
};

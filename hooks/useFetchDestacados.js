import { useState, useEffect } from 'react';

export const useFetchDestacados = () => {
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDestacados = async () => {
        try {
            const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/destacados');
            if (!response.ok) throw new Error('Error al obtener los productos destacados');
            const result = await response.json();
            setProductosDestacados(result.productos);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDestacados();
    }, []);

    return {
        productosDestacados,
        isLoading,
        error
    };
};
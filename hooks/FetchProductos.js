import { useEffect, useState } from "react";

export const useFetchProductos = () => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProductos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/productos/all');
            const result = await response.json();
            setProductos(result.productos);
        } catch (error) {
            console.error("Error fetching productos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    return {
        productos,
        isLoading // Ensure isLoading is returned
    };
};

import { useEffect, useState } from "react";

export const useFetchProductosFiltro = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getProductos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/productos/all');
            const result = await response.json();
            setProductos(result.productos);
            setIsLoading(false);

       
            const categoriasMap = {};
            result.productos.forEach(producto => {
                const { categoria, subcategoria, marca } = producto;
                
                if (!categoriasMap[categoria]) {
                    categoriasMap[categoria] = { 
                        label: categoria, 
                        subcategories: new Set(), 
                        brands: new Set() 
                    };
                }
                
                if (subcategoria) {
                    categoriasMap[categoria].subcategories.add(subcategoria);
                }
                
                if (marca) {
                    categoriasMap[categoria].brands.add(marca);
                }
            });

           
            Object.keys(categoriasMap).forEach(key => {
                categoriasMap[key].subcategories = Array.from(categoriasMap[key].subcategories);
                categoriasMap[key].brands = Array.from(categoriasMap[key].brands);
            });

            setCategorias(categoriasMap);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    return {
        productos,
        categorias,
        isLoading,
    };
};

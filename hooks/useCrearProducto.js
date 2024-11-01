import { useState } from "react";

export const useCrearProducto = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const crear = async (nombre,marca,especificacion,subcategoria,categoria,modelo,precio,imagen,codigo_barras,cantidad,destacado) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/productos/crear', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            marca,
            especificacion,
            subcategoria,
            categoria,
            modelo,
            precio,
            imagen,
            codigo_barras,
            cantidad,
            destacado,
          }),
        });
        console.log(nombre)
        if (response.ok){
          setMessage('Producto creado correctamente');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        //console.log(message);
      }
    };
    
    return {
      isLoading,
      crear,
      message,
    };
  };
import { useState } from "react";

export const useUpdateProducto = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const update = async (id,nombre,marca,especificacion,subcategoria,categoria,modelo,precio,imagen,codigo_barras,cantidad,destacado) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/productos/update/${id}`, {
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
        if (response.ok){
          setMessage('Producto actualizado correctamente');
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
      update,
      message,
    };
  };
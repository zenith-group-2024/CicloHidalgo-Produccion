import { useState } from "react";

export const useDeleteProducto = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const deleteProducto = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/productos/delete/${id}`,
          {method: 'DELETE'}
        )
        if (response.ok){
          setMessage('Producto eliminado correctamente');
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
      deleteProducto,
      message,
    };
  };
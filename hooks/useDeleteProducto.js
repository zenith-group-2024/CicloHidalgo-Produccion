import { useState } from "react";

export const useDeleteProducto = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const deleteProducto = async (id) => {
      try {
        const response = await fetch(`darkslategrey-marten-184177.hostingersite.com/api/productos/delete/${id}`,
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
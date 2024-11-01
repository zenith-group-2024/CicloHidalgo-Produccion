import { useState } from "react";

export const useDeleteContenido = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const deleteContenido = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/contenido/delete/${id}`)
        if (response.ok){
          setMessage('Video eliminado correctamente');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      
      }
    };
    
    return {
      isLoading,
      deleteContenido,
      message,
    };
  };
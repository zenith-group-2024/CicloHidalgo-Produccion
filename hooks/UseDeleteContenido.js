import { useState } from "react";

export const useDeleteContenido = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const deleteContenido = async (id) => {
      try {
        const response = await fetch(`darkslategrey-marten-184177.hostingersite.com/api/contenido/delete/${id}`)
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
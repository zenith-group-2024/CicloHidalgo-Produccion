import { useState } from "react";
export const useUpdateContenido = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const editar = async (id, titulo, descripcion, video_incrustado) => {
      setIsLoading(true);
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/contenido/update/${id}`, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  titulo,
                  descripcion,
                  video_incrustado
              }),
          });

          if (response.ok) {
              setMessage('Video actualizado correctamente');
          } else {
              setMessage('Error al actualizar el video');
          }
      } catch (error) {
          console.log(error);
          setMessage('Error de conexión');
      } finally {
          setIsLoading(false);
      }
  };

  return {
      isLoading,
      editar,
      message,
  };
};
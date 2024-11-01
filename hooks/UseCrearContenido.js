import { useState } from "react";

export const useCrearContenido = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const crear = async (titulo, descripcion, video_incrustado) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/contenido/creacion', {
                method: 'POST', 
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

            console.log(titulo, descripcion, video_incrustado);

            if (response.ok) {
                setMessage('Video creado correctamente');
            } else {
                const data = await response.json();
                setMessage(data.errors ? data.errors : 'Error al crear el video');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error de red');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        crear,
        message,
    };
};

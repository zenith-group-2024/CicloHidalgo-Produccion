const API_BASE_URL = 'https://darkslategrey-marten-184177.hostingersite.com/api';

export const finalizarOrden = async (ordenData, authToken) => {
    try {
        if (ordenData.metodo_envio === "retiro") {
            ordenData = {
                ...ordenData,
                direccion: null,
                direccion_detalles: null,
                provincia: null,
                ciudad: null,
                codigo_postal: null,
            };
        }
        const response = await fetch(`${API_BASE_URL}/registrar-orden`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(ordenData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al registrar la orden');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en finalizarOrden:', error);
        throw error;
    }
};
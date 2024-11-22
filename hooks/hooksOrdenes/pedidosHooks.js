const API_BASE_URL = "https://darkslategrey-marten-184177.hostingersite.com/api"; // Esto de aquí no debería poderse hacer algo global para todos los hooks?

export const fetchPedidos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/ordenes/all`);
        if (!response.ok) throw new Error("Error al obtener pedidos");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en fetchPedidos:", error);
        throw error;
    }
};

export const toggleEstadoPedido = async (pedidoId, estadoActual) => {
    try {
        const nuevoEstado = estadoActual === "PENDIENTE" ? "COMPLETO" : "PENDIENTE";
        const response = await fetch(
            `${API_BASE_URL}/toggle-estado-orden/${pedidoId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            }
        );

        if (!response.ok) throw new Error("Error al cambiar el estado de la orden");
        return await response.json();
    } catch (error) {
        console.error("Error en toggleEstadoPedido:", error);
        throw error;
    }
};

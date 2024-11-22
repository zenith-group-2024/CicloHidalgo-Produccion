export const fetchTopProductos = async (
    globalProductos,
    setProductosMasVendidos
) => {
    try {
        const response = await fetch("http://localhost:8000/api/top-productos");
        if (response.ok) {
            const data = await response.json();
            const productosWithImages = data.top_productos.map((producto) => {
                const productoContext = globalProductos.find(
                    (p) => p.id === producto.id
                );
                return {
                    id: producto.id,
                    nombre: producto.nombre,
                    vendidos: producto.total_cantidad,
                    imagen: productoContext ? productoContext.imagen : null,
                };
            });
            setProductosMasVendidos(productosWithImages);
        } else {
            console.error("Error al obtener productos más vendidos");
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
};

export const fetchUsuarios = async (
    setUsuariosRegistrados,
    setUltimosUsuarios
) => {
    try {
        const response = await fetch("https://darkslategrey-marten-184177.hostingersite.com/api/obtener-usuarios");
        const data = await response.json();
        setUsuariosRegistrados(data.length);
        setUltimosUsuarios(data.slice(-5).reverse());
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
};

export const fetchPedidos = async (
    setTotalPedidos,
    setPedidosPendientes,
    setPedidosCompletados
) => {
    try {
        const response = await fetch("http://localhost:8000/api/ordenes/all");
        const data = await response.json();
        setTotalPedidos(data.length);
        setPedidosPendientes(data.filter((p) => p.estado === "PENDIENTE"));
        setPedidosCompletados(data.filter((p) => p.estado === "COMPLETO"));
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
    }
};

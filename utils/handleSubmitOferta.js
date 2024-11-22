export const handleSubmitOferta = async ({
    e,
    selectedProducts,
    descuento,
    productos,
    setProductos,
    setBackendMessage,
}) => {
    e.preventDefault();

    const idsToUpdate = Object.keys(selectedProducts).filter((id) => selectedProducts[id]);
    if (idsToUpdate.length === 0) {
        alert('Por favor, seleccione al menos un producto');
        return;
    }

    try {
        const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/actualizar-descuento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: idsToUpdate, descuento }),
        });

        if (!response.ok) {
            console.error('Error response:', response.status, response.statusText);
            throw new Error('Error al procesar la oferta');
        }

        // Lógica común para actualizar productos
        const updatedProducts = productos.map((producto) => {
            if (idsToUpdate.includes(producto.id.toString())) {
                return { ...producto, descuento };
            }
            return producto;
        });

        setProductos(updatedProducts);

        const result = await response.json();
        setBackendMessage(result.message);

    } catch (error) {
        console.error('Error al enviar los datos:', error);
    }
};
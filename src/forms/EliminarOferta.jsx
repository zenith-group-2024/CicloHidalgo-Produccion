import React from 'react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EliminarOferta() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [backendMessage, setBackendMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/con-descuento/all');
                const data = await response.json();
                setProductos(data.productos);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    if (loading) {
        return <p className="text-center m-auto">Cargando productos...</p>;
    }

    const handleCheckboxChange = (id) => {
        setSelectedProducts((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };

    const handleSubmit = async (e) => {
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
                body: JSON.stringify({ ids: idsToUpdate, descuento: 0 }),
            });

            if (!response.ok) {
                console.error('Error response:', response.status, response.statusText);
                throw new Error('Error al eliminar las ofertas');
            }

            const updatedProducts = productos.map((producto) => {
                if (idsToUpdate.includes(producto.id.toString())) {
                    return { ...producto, descuento: 0 };
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
    const filteredProducts = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center py-10">
                <div className="relative w-full max-w-4xl mx-4">

                    <button className="absolute top-2 right-2">
                        <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                    </button>

                    <form className="bg-white p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-semibold mb-6 text-center">Eliminar Ofertas</h2>

                        <div className="flex justify-center mb-4">
                            <label className="block m-2 text-gray-700 text-lg font-bold" htmlFor="search">Buscar:</label>
                            <input
                                className="border m-2 p-[.25rem]"
                                type="search"
                                id="search"
                                name="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar producto o marca"
                            />
                        </div>

                        <div className="grid grid-cols-5">
                            <label className="mx-auto block text-gray-700 text-lg font-bold">Imagen</label>
                            <label className="mx-auto block text-gray-700 text-lg font-bold">Producto</label>
                            <label className="mx-auto block text-gray-700 text-lg font-bold">Marca</label>
                            <label className="mx-auto block text-gray-700 text-lg font-bold">Descuento actual</label>
                            <label className="mx-auto block text-gray-700 text-lg font-bold">Eliminar Oferta</label>
                        </div>
                        <div className="flex flex-col divide-y-2 divide-blue">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((producto) => (
                                    <div className="grid grid-cols-5 p-4" key={producto.id}>
                                        <img className="m-auto w-20 h-20 object-contain rounded-lg" src={producto.imagen} alt={producto.nombre} />
                                        <p className="m-auto">{producto.nombre}</p>
                                        <p className="m-auto">{producto.marca}</p>
                                        <p className="m-auto">{producto.descuento}%</p>
                                        <input
                                            className="m-auto size-6 accent-red"
                                            type="checkbox"
                                            checked={!!selectedProducts[producto.id]}
                                            onChange={() => handleCheckboxChange(producto.id)}
                                            value={producto.id}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No hay productos en este momento!</p>
                            )}
                        </div>
                        <button type="submit" className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition w-full">
                            Eliminar
                        </button>

                        {backendMessage && (
                            <p className="text-center text-white bg-green-600 w-fit mx-auto p-2">{backendMessage}</p>
                        )}

                    </form>
                </div>
            </div>
        </>
    );
}

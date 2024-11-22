import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../global/GlobalState';
import Footer from '../UI/Footer';
import Navbar from '../UI/Navbar';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchOrdenes } from "../../hooks/hooksOrdenes/fetchOrdenes.js";

const ListaOrdenes = () => {
    const { state } = useContext(GlobalContext);
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;
    const [fadeAnimation, setFadeAnimation] = useState(false);

    useEffect(() => {
        const cargarOrdenes = async () => {
            try {
                const data = await fetchOrdenes(state.id);
                setOrdenes(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (state.id) {
            cargarOrdenes();
        }
    }, [state.id]);

    const handleVerDetalles = (ordenId) => {
        setOrdenSeleccionada(ordenId === ordenSeleccionada ? null : ordenId);
    };

    const mostrarCampo = (label, valor) => {
        return valor ? <p><strong>{label}:</strong> {valor}</p> : null;
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = ordenes.slice(indexOfFirstOrder, indexOfLastOrder);

    const changePage = (newPage) => {
        setFadeAnimation(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setFadeAnimation(false);
        }, 100);
    };

    const nextPage = () => changePage(Math.min(currentPage + 1, Math.ceil(ordenes.length / ordersPerPage)));
    const prevPage = () => changePage(Math.max(currentPage - 1, 1));

    if (loading) {
        return <div className="text-center text-3xl font-bold my-6 text-gray">Cargando órdenes...</div>;
    }

    if (error) {
        return <div className="text-red font-semibold text-center">Error: {error}</div>;
    }

    return (
        <>
            <Navbar />

            <div className="mx-auto min-h-screen flex flex-col p-8">
                <h1 className="text-3xl text-black font-bold mb-8 text-center font-primary">Tus Pedidos</h1>

                {ordenes.length === 0 ? (
                    <p className="text-center text-lg font-semibold text-gray">No tienes órdenes registradas.</p>
                ) : (
                    <ul className={`mx-auto flex flex-col space-y-6 w-full max-w-4xl transition-opacity duration-300 ${fadeAnimation ? 'opacity-0' : 'opacity-100'}`}>
                        {currentOrders.map((orden) => (
                            <li className="bg-white shadow-md rounded-xl p-6 transition-all transform hover:shadow-lg" key={orden.id}>
                                <div className="space-y-3">
                                    <p><strong>Cliente:</strong> {orden.nombre} {orden.apellido}</p>
                                    <p><strong>Total:</strong> ₡{orden.total}</p>

                                    <div className="grid grid-cols-2 gap-2">
                                        <p className="font-semibold text-black">Productos</p>
                                        <p className="font-semibold text-black text-center">Cantidad</p>
                                        {orden.productos.map((producto) => (
                                            <React.Fragment key={producto.id}>
                                                <p className="ml-4 ">▸ {producto.nombre}</p>
                                                <p className=" text-center">{producto.pivot.cantidad}</p>
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {ordenSeleccionada === orden.id && (
                                        <div className="mt-4 rounded-lg p-4">
                                            <p><strong>ID del pedido:</strong> {orden.id}</p>
                                            <p><strong>Método de Pago:</strong> {orden.metodo_pago}</p>
                                            <p><strong>Teléfono:</strong> {orden.telefono}</p>
                                            {mostrarCampo("Dirección", orden.direccion)}
                                            {mostrarCampo("Provincia", orden.provincia)}
                                            {mostrarCampo("Ciudad", orden.ciudad)}
                                            {mostrarCampo("Código Postal", orden.codigo_postal)}
                                        </div>
                                    )}

                                    <button
                                        className="flex items-center justify-center gap-2 px-4 py-2 mt-4 bg-blue text-white rounded-lg hover:opacity-90 transition"
                                        onClick={() => handleVerDetalles(orden.id)}
                                    >
                                        {ordenSeleccionada === orden.id ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        {ordenSeleccionada === orden.id ? 'Ocultar detalles' : 'Ver detalles'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}


                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        className="flex items-center gap-2 text-white px-4 py-2 bg-gray rounded-l-lg hover:bg-blue transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-5 w-5" /> Anterior
                    </button>
                    <span className="px-4 py-2 bg-white rounded-md text-black font-semibold">
                        Página {currentPage}
                    </span>
                    <button
                        className="flex items-center gap-2 text-white px-4 py-2 bg-gray rounded-r-lg hover:bg-blue transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(ordenes.length / ordersPerPage)}
                    >
                        Siguiente <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ListaOrdenes;
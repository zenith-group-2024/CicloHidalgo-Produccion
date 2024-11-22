import React, { useContext, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FormAddProduct from '../forms/AñadirProducto';
import FormAddOffer from '../forms/AnadirOferta';
import Navbar from './Navbar';
import Footer from './Footer';
import { Search } from 'lucide-react';
import {GlobalProductos} from '../global/GlobalProductos';
import { useDeleteProducto } from '../../hooks/hooksProductos/useDeleteProducto.js';
import { Navigate, NavLink } from 'react-router-dom';
import { GlobalContext } from '../global/GlobalState.jsx';

const CRUDProductos = () => {
    const { state} = useContext(GlobalContext);
    const { isAdmin } = state;
    const [activeTab, setActiveTab] = useState('list');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const globalProductos = useContext(GlobalProductos);
    const [isLoading, setIsLoading] = useState(true)
    const filteredProductos = globalProductos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const { deleteProducto } = useDeleteProducto();

    useEffect(() => {
        if (globalProductos.length > 0){
            setTimeout(() => {
                setIsLoading(false)
            },0)
        }
    },[globalProductos])

    const generatePDF = () => {
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();

        doc.setFontSize(16);
        doc.text('Informe de Productos', 14, 20);
        doc.setFontSize(10);
        doc.setTextColor(75, 85, 99);
        doc.text(`Fecha: ${date}`, 14, 30);
        doc.setTextColor(0, 0, 0);

        const columns = ["Nombre", "Marca", "Precio", "Cantidad"];
        const rows = filteredProductos.map(producto => [
            producto.nombre,
            producto.marca,
            `$${producto.precio}`,
            producto.cantidad
        ]);

        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 40,
            theme: 'striped',
            headStyles: { fillColor: [69, 123, 157] },
            styles: { cellPadding: 3, fontSize: 10 },
            margin: { top: 20, left: 14, right: 14 },
        });

        doc.save('Informe_Productos.pdf');
    };

    const handleDelete = (productoId) => {
        deleteProducto(productoId);
        setTimeout(() => {
            window.location.replace('');
        },500)
    }

    if (!isAdmin) {
        return (        
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4 sm:p-6 bg-gray-50">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 sm:mt-8 mb-4 sm:mb-8 text-center text-old font-primary text-red">Acceso Denegado</h2>
            </div>
            <Footer />
        </div>); }
        else {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-grow p-4 sm:p-6 bg-gray-50">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 sm:mt-8 mb-4 sm:mb-8 text-center text-old font-primary">Gestión de Productos</h2>


                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
                    <button
                        className="px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-red text-white hover:bg-red-600 text-sm sm:text-base"
                        onClick={() => {
                            setActiveTab('add');
                        }}
                    >
                        Añadir Producto
                    </button>

                    <button
                        className="px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base"
                        onClick={generatePDF}
                    >
                        Generar Informe PDF
                    </button>


                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Búsqueda..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray rounded-full focus:outline-none focus:ring-2 focus:ring-old"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray">
                            <Search size={20} />
                        </span>
                    </div>
                </div>


                {activeTab === 'add' && <FormAddProduct />}
                {activeTab === 'addOffer' && selectedProduct && <FormAddOffer producto={selectedProduct} />}
                {activeTab === 'list' && (
                    <div className="mt-6">
                        {isLoading ? (
                            <p className="text-center text-gray-600">Cargando productos...</p>
                        ) : filteredProductos.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {filteredProductos.map((producto) => (
                                    <div key={producto.id} className="rounded-lg shadow-lg shadow-lg transition-shadow p-4 bg-white flex flex-col">
                                        <div className="w-full h-48 overflow-hidden rounded-md mb-4 flex items-center justify-center bg-gray-100">
                                            <img
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                className="w-auto h-full object-contain rounded-md"
                                            />
                                        </div>
                                        <h4 className="font-semibold text-lg text-gray-800 mb-1">{producto.nombre}</h4>
                                        <p className="text-gray mb-1">Marca: <span className="text-black">{producto.marca}</span></p>
                                        <p className="text-gray mb-1">Precio: <span className="text-black">${producto.precio}</span></p>
                                        <p className="text-gray">Cantidad: <span className="text-black">{producto.cantidad}</span></p>


                                        <div className="mt-4 flex flex-wrap justify-between space-y-2 sm:space-y-0">
                                            <NavLink
                                                to={`/Editar/${producto.id}`}
                                                className="px-3 py-1 bg-blue text-white rounded-full hover:bg-blue-600 transition text-xs sm:text-sm"
                                            >
                                                Editar
                                            </NavLink>

                                            <button
                                                className="px-3 py-1 bg-red text-white rounded-full hover:bg-red-600 transition text-xs sm:text-sm"
                                                onClick={() => handleDelete(producto.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600">No hay productos disponibles.</p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );}
};

export default CRUDProductos;
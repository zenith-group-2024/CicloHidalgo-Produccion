import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const VistaPedidos = ({ pedidosPendientes = [], pedidosCompletados = [], formatFecha }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const pedidosPorPagina = 5;

    
    const todosLosPedidos = [...pedidosPendientes, ...pedidosCompletados];
    const pedidosFiltrados = todosLosPedidos.filter(pedido => 
        pedido.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pedido.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.id.toString().includes(searchTerm)
    );
    
    const totalPaginas = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);

    const indexUltimoPedido = paginaActual * pedidosPorPagina;
    const indexPrimerPedido = indexUltimoPedido - pedidosPorPagina;
    const pedidosActuales = pedidosFiltrados.slice(indexPrimerPedido, indexUltimoPedido);

    const handlePaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    
    const formatoMoneda = (num) => {
        return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const calcularTotalPedido = (productos) => {
        return productos.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
    };

    const generarPDF = (pedido) => {
        if (!pedido) return;

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`Informe de Pedido - ID: ${pedido.id}`, 14, 20);

        doc.setFontSize(12);
        doc.text(`Cliente: ${pedido.nombre} ${pedido.apellido}`, 14, 30);
        doc.text(`Fecha: ${formatFecha(pedido.created_at)}`, 14, 40);
        doc.text(`Teléfono: ${pedido.telefono}`, 14, 50);
        doc.text(`Dirección: ${pedido.direccion}`, 14, 60);

        
        const totalPedido = formatoMoneda(calcularTotalPedido(pedido.productos));
        doc.setFont('helvetica', 'bold');
        doc.text(`Total del Pedido: $${totalPedido}`, 14, 70);
        doc.setFont('helvetica', 'normal'); 

        const productos = pedido.productos.map(producto => [
            producto.nombre,
            producto.cantidad,
            `$${formatoMoneda(producto.precio)}`, 
            `$${formatoMoneda(producto.cantidad * producto.precio)}`, 
        ]);

        doc.autoTable({
            head: [['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal']],
            body: productos,
            startY: 80,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [69, 123, 157] },
            columnStyles: {
                2: { halign: 'right' },
                3: { halign: 'right' }
            }
        });

        doc.save(`Pedido_${pedido.id}.pdf`);
    };

    const generarPDFTodosPedidos = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Informe de Todos los Pedidos', 14, 20);

        pedidosFiltrados.forEach((pedido, index) => {
            const productos = pedido.productos.map(producto => [
                producto.nombre,
                producto.cantidad,
                `$${formatoMoneda(producto.precio)}`, 
                `$${formatoMoneda(producto.cantidad * producto.precio)}` 
            ]);

            const totalPedido = formatoMoneda(calcularTotalPedido(pedido.productos));
            const startY = index === 0 ? 30 : doc.lastAutoTable.finalY + 20;

            doc.setFontSize(12);
            doc.text(`Pedido ID: ${pedido.id}`, 14, startY);
            doc.text(`Cliente: ${pedido.nombre} ${pedido.apellido}`, 14, startY + 10);
            doc.text(`Teléfono: ${pedido.telefono}`, 14, startY + 20);
            doc.text(`Fecha: ${formatFecha(pedido.created_at)}`, 14, startY + 30);

            // Total en negrita
            doc.setFont('helvetica', 'bold');
            doc.text(`Total del Pedido: $${totalPedido}`, 14, startY + 40);
            doc.setFont('helvetica', 'normal'); // Regresar a fuente normal

            doc.autoTable({
                head: [['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal']],
                body: productos,
                startY: startY + 50,
                theme: 'striped',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [69, 123, 157], textColor: 255 },
                columnStyles: {
                    2: { halign: 'right' },
                    3: { halign: 'right' }
                }
            });
        });

        doc.save('Informe_Todos_Los_Pedidos.pdf');
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-old border-b border-gray pb-4">Pedidos Realizados</h2>
            
           
            <input
                type="text"
                placeholder="Buscar pedidos por nombre, apellido o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue"
            />

            <button
                onClick={generarPDFTodosPedidos}
                className="mb-4 px-3 py-1 bg-blue text-white  rounded-md shadow text-md"
            >
                Descargar Informe General
            </button>
            
            <ul className="space-y-4">
                {pedidosActuales.map((pedido) => (
                    <li key={pedido.id} className="p-4 rounded-lg bg-gray-100 shadow-md flex flex-col">
                        <div>
                            <p className="font-medium text-gray-800">Pedido ID: {pedido.id}</p>
                            <p className="text-gray-600 text-sm">Cliente: {pedido.nombre} {pedido.apellido}</p>
                            <p className="text-gray-600 text-sm">Fecha: {formatFecha(pedido.created_at)}</p>
                        </div>
                        <button
                            onClick={() => generarPDF(pedido)}
                            className="px-3 py-1 bg-gray hover:bg-blue text-white rounded-full shadow text-sm ml-auto"
                        >
                            Descargar PDF
                        </button>
                    </li>
                ))}
            </ul>

            
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePaginaAnterior}
                    disabled={paginaActual === 1}
                    className="px-4 py-2 rounded-lg bg-blue text-white shadow"
                >
                    Anterior
                </button>
                <button
                    onClick={handlePaginaSiguiente}
                    disabled={paginaActual === totalPaginas}
                    className="px-4 py-2 rounded-lg bg-blue text-white shadow"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default VistaPedidos;

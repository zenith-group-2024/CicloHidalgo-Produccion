import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProductosMasVendidos = ({ productos }) => {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Informe de Productos Más Vendidos', 14, 20);

    const fechaActual = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha de generación: ${fechaActual}`, 14, 30);
    
    const productosData = productos.map((producto) => [
      producto.nombre,
      producto.vendidos.toLocaleString('es-ES'), 
    ]);

    doc.autoTable({
      head: [['Producto', 'Cantidad Vendida']],
      body: productosData,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [69, 123, 157], textColor: 255 },
      styles: { fontSize: 10, halign: 'center' },
    });

    doc.save('Informe_Productos_Mas_Vendidos.pdf');
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-old border-b border-gray pb-4">Productos Más Vendidos</h2>
      <button
        onClick={generarPDF}
        className="mb-4 px-3 py-1 bg-blue text-white rounded-md shadow text-md"
      >
        Descargar Informe de Productos
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="p-4 text-left font-medium text-gray uppercase tracking-wide border-b border-gray-300">Producto</th>
              <th className="p-4 text-left font-medium text-gray uppercase tracking-wide border-b border-gray-300">Cantidad Vendida</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="bg-white shadow-sm rounded-lg">
                <td className="p-4 text-gray flex items-center space-x-4 border border-gray rounded-l-lg">
                  <img src={producto.imagen} alt={producto.nombre} className="h-14 w-14 object-cover rounded-md shadow-sm" />
                  <span className="font-semibold text-black">{producto.nombre}</span>
                </td>
                <td className="p-4 text-black font-medium text-lg border border-gray rounded-r-lg">
                  {producto.vendidos.toLocaleString('es-ES')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosMasVendidos;

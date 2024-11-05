import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const VistaUsuariosRegistrados = ({ usuarios }) => {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Informe de Últimos Usuarios Registrados', 14, 20);

  
    const fechaActual = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha de generación: ${fechaActual}`, 14, 30);

    
    const usuariosData = usuarios.map((usuario) => [
      usuario.nombre,
      usuario.email
    ]);

    doc.autoTable({
      head: [['Nombre', 'Email']],
      body: usuariosData,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [69, 123, 157], textColor: 255 },
      styles: { fontSize: 10, halign: 'center' },
    });

    doc.save('Informe_Ultimos_Usuarios.pdf');
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-old border-b border-gray pb-4">Usuarios Registrados</h2>
      <button
        onClick={generarPDF}
        className="mb-4 px-3 py-1 bg-blue text-white rounded-md shadow text-md"
      >
        Descargar Informe de Usuarios
      </button>
      <ul className="space-y-4">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="p-4 rounded-lg bg-gray-100 shadow-md flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{usuario.nombre}</p>
              <p className="text-gray-600 text-sm">{usuario.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VistaUsuariosRegistrados;

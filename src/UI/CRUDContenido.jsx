// CRUDContenido.js
import React, { useState } from 'react';
import FormAddContent from '../forms/AñadirContenido';
import FormEditContent from '../forms/EditarContenido';
import FormDeleteContent from '../forms/EliminarContenido';
import { useFetchContenidos } from '../../hooks/FetchContenidos';
import Navbar from './Navbar';
import Footer from './Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CRUDContenido = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedContent, setSelectedContent] = useState(null);
  const { contenidos, isLoading, getContenidos } = useFetchContenidos();

  const handleEdit = (content) => {
    setSelectedContent(content);
    setActiveTab('edit');
  };

  const handleDelete = (content) => {
    setSelectedContent(content);
    setActiveTab('delete');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(16);
    doc.text('Informe de Contenidos', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text(`Fecha: ${date}`, 14, 30);
    doc.setTextColor(0, 0, 0);

    const columns = ["Título", "Descripción"];
    const rows = contenidos.map((content) => [
      content.titulo,
      content.descripcion,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      theme: 'striped',
      styles: { cellPadding: 3, fontSize: 10 },
      margin: { top: 20, left: 14, right: 14 },
    });

    doc.save('Informe_Contenidos.pdf');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow p-6 bg-gray-50">
        <h2 className="text-4xl font-bold mt-8 mb-8 text-center text-old">Gestión de Contenidos</h2>

        <div className="flex justify-between items-center mb-8">
          <button
            className="px-6 py-2 rounded-full bg-red text-white hover:bg-red-600"
            onClick={() => {
              setSelectedContent(null);
              setActiveTab('add');
            }}
          >
            Añadir Contenido
          </button>

          <button
            className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
            onClick={generatePDF}
          >
            Generar Informe PDF
          </button>
        </div>

        {activeTab === 'add' && <FormAddContent onRefresh={getContenidos} />}
        {activeTab === 'edit' && selectedContent && (
          <FormEditContent content={selectedContent} onRefresh={getContenidos} />
        )}
        {activeTab === 'delete' && selectedContent && (
          <FormDeleteContent content={selectedContent} onRefresh={getContenidos} />
        )}
        {activeTab === 'list' && (
          <div className="mt-6">
            {isLoading ? (
              <p className="text-center text-gray-600">Cargando contenidos...</p>
            ) : contenidos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contenidos.map((content) => (
                  <div
                    key={content.id}
                    className="rounded-lg shadow-lg hover:shadow-lg transition-shadow p-4 bg-white"
                  >
                    <h4 className="font-semibold text-lg text-gray-800 mb-1">
                      {content.titulo}
                    </h4>
                    <p className="text-gray mb-1">
                      Descripción: <span className="text-black">{content.descripcion}</span>
                    </p>

                    <div className="mt-4 flex justify-between">
                      <button
                        className="px-3 py-1 bg-blue text-white rounded-full hover:bg-blue-600 transition"
                        onClick={() => handleEdit(content)}
                      >
                        Editar
                      </button>
                      <button
                        className="px-3 py-1 bg-red text-white rounded-full hover:bg-red-600 transition"
                        onClick={() => handleDelete(content)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No hay contenidos disponibles.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CRUDContenido;
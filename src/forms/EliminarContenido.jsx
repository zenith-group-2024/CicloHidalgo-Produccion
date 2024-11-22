import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDeleteContenido } from '../../hooks/hooksContenido/UseDeleteContenido';
import { useFetchContenidos } from '../../hooks/hooksContenido/FetchContenidos';

const FormEliminarContenido = ({ onClose }) => {
  const { deleteContenido, isLoading, message } = useDeleteContenido();
  const { contenidos, isLoading: isLoadingContenidos } = useFetchContenidos();
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleSelectChange = (e) => {
    const contenidoId = parseInt(e.target.value);
    const contenidoEncontrado = contenidos.find(cont => cont.id === contenidoId);
    setContenidoSeleccionado(contenidoEncontrado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contenidoSeleccionado) {
      await deleteContenido(contenidoSeleccionado.id);

      setShowPopup(true);
      setContenidoSeleccionado(null);
    }
  };


  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  if (isLoadingContenidos) return <p>Cargando contenidos...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </button>

        <h2 className="text-2xl mb-4 text-center">Selecciona un Contenido para Eliminar</h2>
        <select onChange={handleSelectChange} className="mb-4 w-full px-4 py-2 border rounded-lg">
          <option value="">Selecciona un contenido</option>
          {contenidos.map(contenido => (
            <option key={contenido.id} value={contenido.id}>
              {contenido.titulo}
            </option>
          ))}
        </select>

        {contenidoSeleccionado && (
          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Eliminar Contenido</h2>
            <p className="text-center">¿Estás seguro de que deseas eliminar "{contenidoSeleccionado.titulo}"?</p>

            <button type="submit" className="bg-red  text-white px-4 py-2 rounded-full hover:bg-red-800 transition w-full">
              {isLoading ? 'Eliminando...' : 'Eliminar Contenido'}
            </button>

            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </form>
        )}

        {showPopup && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 border border-red-500 shadow-lg p-4 rounded-md z-10">
            <p className="text-red  text-lg font-semibold">Contenido eliminado correctamente.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormEliminarContenido;

import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react'; 
import { useUpdateContenido } from '../../hooks/UseUpdateContenido';
import { useFetchContenidos } from '../../hooks/FetchContenidos';

const FormContenido = ({ onClose }) => {
  const { editar, isLoading, message } = useUpdateContenido();
  const inputFile = useRef(null);
  const { contenidos, isLoading: isLoadingContenidos, setContenidos } = useFetchContenidos();
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
  
  const [contenido, setContenido] = useState({
    titulo: '',
    descripcion: '',
    video_incrustado: '',
  });

  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    if (contenidoSeleccionado) {
      setContenido({
        titulo: contenidoSeleccionado.titulo,
        descripcion: contenidoSeleccionado.descripcion,
        video_incrustado: contenidoSeleccionado.video_incrustado,
      });
    }
  }, [contenidoSeleccionado]);

  const handleSelectChange = (e) => {
    const contenidoId = parseInt(e.target.value);
    const contenidoEncontrado = contenidos.find(cont => cont.id === contenidoId);
    setContenidoSeleccionado(contenidoEncontrado);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setContenido({
      ...contenido,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (contenidoSeleccionado) {
      const updatedContent = {
        id: contenidoSeleccionado.id,
        titulo: contenido.titulo,
        descripcion: contenido.descripcion,
        video_incrustado: contenido.video_incrustado,
      };
      
      await editar(updatedContent.id, updatedContent.titulo, updatedContent.descripcion, updatedContent.video_incrustado);
      
      setContenidos((prevContenidos) =>
        prevContenidos.map((cont) =>
          cont.id === updatedContent.id ? updatedContent : cont
        )
      );

      setShowPopup(true);
      
      setContenido({
        titulo: '',
        descripcion: '',
        video_incrustado: '',
      });
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

        <h2 className="text-2xl mb-4 text-center">Selecciona un Contenido para Editar</h2>
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
            <h2 className="text-3xl font-semibold mb-6 text-center">Editar Contenido</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-gray-700">Titulo del Video</label>
                <input
                  type="text"
                  name="titulo"
                  value={contenido.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700">Descripcion</label>
                <textarea
                  name="descripcion"
                  value={contenido.descripcion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Link del video</label>
                <input
                  type="text"
                  name="video_incrustado"
                  value={contenido.video_incrustado}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <button type="submit" className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition w-full">
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </button>

            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </form>
        )}
      
        {showPopup && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-green-500 shadow-lg p-4 rounded-md z-10">
            <p className="text-green-600 text-lg font-semibold">Cambios guardados correctamente.</p>  
          </div>
        )}
      </div>
    </div>
  );
};

export default FormContenido;

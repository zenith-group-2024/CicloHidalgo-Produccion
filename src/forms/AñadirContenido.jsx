import React, { useRef, useState } from 'react';
import { X } from 'lucide-react'; 
import { useCrearContenido } from '../../hooks/UseCrearContenido.js';

const FormContenido = ({ onClose }) => {
  const { crear } = useCrearContenido();
  const inputFile = useRef(null);
  const [contenido, setContenido] = useState({
    titulo: '',
    descripcion: '',
    video_incrustado: '',
  
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setContenido({
      ...contenido,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crear(
      contenido.titulo,
      contenido.descripcion,
      contenido.video_incrustado,
    );

    setContenido(
      {
        titulo: '',
        descripcion: '',
        video_incrustado: '',
      } 
    );

    if(inputFile.current){
      inputFile.current.value = '';
      inputFile.current.type = 'text';
      inputFile.current.type = 'file';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </button>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold mb-6 text-center">Añadir Contenido</h2>

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
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContenido;
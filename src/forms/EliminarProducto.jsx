import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react'; 
import Select from 'react-select';
import { useDeleteProducto } from '../../hooks/useDeleteProducto.js';
import { useFetchProductos } from '../../hooks/FetchProductos.js';

const FormEliminarProducto = ({ onClose }) => {
  const { deleteProducto } = useDeleteProducto();
  const { productos } = useFetchProductos();
  const [producto, setProducto] = useState({
    id: '',
  });

  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (option) => {

    setSelectedOption(option);
    setProducto((producto) => ({
      ...producto,
      id: option.id,
    }))

  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
  const crearOpciones = () => {
    const opciones = productos.map(producto => ({
      value : producto.id,
      label : producto.nombre,
      id : producto.id,
      image : producto.imagen
    }))
    setOptions(opciones);
  }

  crearOpciones(); 
  },[productos]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteProducto(
      producto.id,
    );
    onClose();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </button>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold mb-6 text-center">Eliminar Producto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
              <label htmlFor="producto">Seleccione el producto a eliminar</label>
               <Select value={selectedOption}
                options={options}
                inputId='id'
                name = "id"
                onChange={handleChange}
                formatOptionLabel={option =>(
                  <div className='container mx-auto p-10 border-black drop-shadow-lg rounded-md bg-white'>
                      <div className="flex-grow flex flex-col">
                        <div className="w-full h-48 "> {option.label}
                          <img 
                            src={option.image} 
                            alt={option.label} 
                            className="w-full h-full object-cover rounded-md" 
                          />
                        </div>
                      </div>
                  </div>
                )} />  
                
            </div>

          </div>
          <button type="submit" className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition w-full">
            Eliminar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEliminarProducto;
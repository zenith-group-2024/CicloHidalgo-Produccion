import React from 'react';

const CrudCard = ({ title, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">{title}</h2>
      <div className="flex justify-center mb-4 space-x-4">
        <button onClick={onAdd} className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition">
          Añadir {title}
        </button>
        <button onClick={onEdit} className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition">
          Editar {title}
        </button>
        <button onClick={onDelete} className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition">
          Eliminar {title}
        </button>
      </div>
    </div>
  );
};

export default CrudCard;
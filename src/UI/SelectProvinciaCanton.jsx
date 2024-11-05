import React, { useState } from 'react';

const provinciasData = {
  "San José": ["Central", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés"],
  "Alajuela": ["Central", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Valverde Vega", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
  "Cartago": ["Central", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
  "Heredia": ["Central", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
  "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
  "Puntarenas": ["Central", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"],
  "Limón": ["Central", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
};

const SelectProvinciaCanton = ({ onProvinciaChange, onCantonChange }) => {
  const [provincia, setProvincia] = useState("");
  const [cantones, setCantones] = useState([]);
  const [error, setError] = useState("");

  const handleProvinciaSelect = (e) => {
    const selectedProvincia = e.target.value;
    setProvincia(selectedProvincia);
    setCantones(provinciasData[selectedProvincia] || []);
    onProvinciaChange(selectedProvincia);
    setError("");  
  };

  const handleCantonSelect = (e) => {
    if (!provincia) {
      setError("Debe seleccionar una provincia primero.");
      return;
    }
    onCantonChange(e.target.value);
    setError("");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-gray-700 mb-2">Provincia</label>
        <select
          value={provincia}
          onChange={handleProvinciaSelect}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled className="text-gray-500">Selecciona una provincia</option>
          {Object.keys(provinciasData).map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Cantón</label>
        <select
          onChange={handleCantonSelect}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled className="text-gray-500">Selecciona un cantón</option>
          {cantones.map((canton) => (
            <option key={canton} value={canton}>{canton}</option>
          ))}
        </select>
        {error && (
          <p className="text-red text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SelectProvinciaCanton;

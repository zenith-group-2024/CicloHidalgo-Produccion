import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function EditarAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [backendMessage, setBackendMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('https://ciclo-hidalgo-desarrollo.vercel.app/api/api/admins');
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('Error al obtener los administradores:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  if (loading) {
    return <p className="text-center m-auto">Cargando administradores...</p>;
  }

  const handleAdminSelect = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAdmin) {
      alert('Por favor, seleccione un administrador para editar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/admin/update/${selectedAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAdmin),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el administrador');
      }

      const result = await response.json();
      setBackendMessage(result.message);

      setTimeout(() => {
        setBackendMessage('');
      }, 3000);

      setAdmins((prev) =>
        prev.map((admin) => (admin.id === selectedAdmin.id ? selectedAdmin : admin))
      );
      setSelectedAdmin(null);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        <form className="bg-white p-8 shadow-md rounded-lg space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-6 text-center">Editar Administradores</h2>

          <div className="flex justify-center mb-4">
            <label className="block m-2 text-gray-700 text-lg font-bold" htmlFor="search">Buscar:</label>
            <input
              className="border m-2 p-[.25rem]"
              type="search"
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o email"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <label className="text-lg font-bold">Nombre</label>
            <label className="text-lg font-bold">Email</label>
            <label className="text-lg font-bold">Contacto</label>
            <label className="text-lg font-bold">Dirección</label>
          </div>
          <div className="divide-y">
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <div
                  className="grid grid-cols-4 p-4 admin-item"
                  key={admin.id}
                  onClick={() => handleAdminSelect(admin)}
                >
                  <p>{admin.nombre}</p>
                  <p>{admin.email}</p>
                  <p>{admin.contacto}</p>
                  <p>{admin.direccion}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No hay administradores en este momento.</p>
            )}
          </div>

          {selectedAdmin && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Modificar Datos</h3>
              <input
                type="text"
                name="nombre"
                value={selectedAdmin.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="border p-2 w-full"
              />
              <input
                type="email"
                name="email"
                value={selectedAdmin.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border p-2 w-full"
              />
              <input
                type="text"
                name="contacto"
                value={selectedAdmin.contacto}
                onChange={handleInputChange}
                placeholder="Contacto"
                className="border p-2 w-full"
              />
              <input
                type="text"
                name="direccion"
                value={selectedAdmin.direccion}
                onChange={handleInputChange}
                placeholder="Dirección"
                className="border p-2 w-full"
              />
            </div>
          )}

          <button type="submit" className="bg-blue text-white px-4 py-2 rounded-full hover:bg-red transition w-full">
            Guardar Cambios
          </button>

          {backendMessage && (
            <p className="text-center text-white bg-green-600 w-fit mx-auto p-2">{backendMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

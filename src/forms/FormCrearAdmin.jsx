import React, { useState, useEffect } from 'react';
import useFetchAdmins from '../../hooks/useFetchAdmins';
import useCreateAdmin from '../../hooks/useCreateAdmin';
import useUpdateAdmin from '../../hooks/useUpdateAdmin';
import useDeleteAdmin from '../../hooks/useDeleteAdmin';

const AdminManager = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    nombre: '',
    contacto: '',
    direccion: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const { admins, loading, error, refetch } = useFetchAdmins();
  const { createAdmin, loading: createLoading, message: createMessage, error: createError } = useCreateAdmin();
  const { updateAdmin, loading: updateLoading, message: updateMessage, error: updateError } = useUpdateAdmin();
  const { deleteAdmin, loading: deleteLoading, message: deleteMessage, error: deleteError } = useDeleteAdmin();

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const success = await createAdmin(newAdmin);
    if (success) {
      setNewAdmin({ nombre: '', contacto: '', direccion: '', email: '', password: '' });
      setShowCreateForm(false);
      refetch();
      setMessage({ text: createMessage || 'Administrador creado exitosamente', type: 'success' });
    } else {
      setMessage({ text: createError || 'Error al crear administrador', type: 'error' });
    }
  };
  

  const handleDelete = async () => {
    if (!selectedAdmin) return;
    try {
      await deleteAdmin(selectedAdmin.id);
      setShowDeleteModal(false);
      setSelectedAdmin(null);
      refetch();
      setMessage({ text: deleteMessage || 'Administrador eliminado correctamente', type: 'success' });
    } catch (error) {
      setMessage({ text: deleteError || 'Error al eliminar el administrador', type: 'error' });
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(false);
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
    if (!selectedAdmin) return;
    await updateAdmin(selectedAdmin.id, selectedAdmin);
    setSelectedAdmin(null);
    refetch();
    setMessage({ text: updateMessage || 'Administrador actualizado exitosamente', type: 'success' });
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const filteredAdmins = admins.filter((admin) =>
    admin &&
    (
      admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue text-white px-6 py-3 rounded-lg mb-6"
        >
          Añadir Administrador
        </button>

        {showCreateForm && (
          <div className="bg-white p-8 shadow-lg rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Añadir Administrador</h2>
            <form onSubmit={handleCreateSubmit}>
              <input
                type="text"
                name="nombre"
                value={newAdmin.nombre}
                onChange={handleCreateInputChange}
                placeholder="Nombre"
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                name="contacto"
                value={newAdmin.contacto}
                onChange={handleCreateInputChange}
                placeholder="Contacto"
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                name="direccion"
                value={newAdmin.direccion}
                onChange={handleCreateInputChange}
                placeholder="Dirección"
                className="border p-2 w-full mb-4"
              />
              <input
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleCreateInputChange}
                placeholder="Email"
                className="border p-2 w-full mb-4"
              />
              <input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleCreateInputChange}
                placeholder="Contraseña"
                className="border p-2 w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue text-white px-4 py-2 rounded-lg"
              >
                Guardar
              </button>
            </form>
          </div>
        )}

        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        <div className="divide-y">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <div key={admin.id} className="flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <p>{admin.nombre}</p>
                  <p>{admin.email}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="bg-blue text-white px-4 py-2 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red text-white px-4 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No se encontraron administradores.</p>
          )}
        </div>

        {selectedAdmin && !showDeleteModal && (
          <div className="space-y-4 mt-4">
            <h3 className="text-2xl font-semibold">Modificar Datos</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                value={selectedAdmin.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                name="contacto"
                value={selectedAdmin.contacto}
                onChange={handleInputChange}
                placeholder="Contacto"
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                name="direccion"
                value={selectedAdmin.direccion}
                onChange={handleInputChange}
                placeholder="Dirección"
                className="border p-2 w-full mb-4"
              />
              <input
                type="email"
                name="email"
                value={selectedAdmin.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border p-2 w-full mb-4"
              />
              <button type="submit" className="bg-blue text-white px-4 py-2 rounded-lg">
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAdmin(null);
                }}
                className="bg-gray text-white px-4 py-2 rounded-lg ml-4"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}

        {showDeleteModal && selectedAdmin && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">¿Está seguro de que desea eliminar este administrador?</h3>
              <p className="mt-2">Nombre: {selectedAdmin.nombre}</p>
              <p>Email: {selectedAdmin.email}</p>
              <p>Contacto: {selectedAdmin.contacto}</p>
              <p>Dirección: {selectedAdmin.direccion}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedAdmin(null);
                  }}
                  className="bg-gray text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {message.text && (
          <p className={`text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminManager;
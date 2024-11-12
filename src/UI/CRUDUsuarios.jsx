import React, { useState, useEffect } from 'react';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';
import useFetchAdmins from '../../hooks/useFetchAdmins';
import useCreateAdmin from '../../hooks/useCreateAdmin';
import useUpdateAdmin from '../../hooks/useUpdateAdmin';
import useDeleteAdmin from '../../hooks/useDeleteAdmin';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CRUDUsuarios = () => {
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
    await createAdmin(newAdmin);
    setNewAdmin({ nombre: '', contacto: '', direccion: '', email: '', password: '' });
    setShowCreateForm(false);
    refetch();
    setMessage({ text: createMessage || 'Administrador creado exitosamente', type: 'success' });
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;
    await deleteAdmin(selectedAdmin.id);
    setShowDeleteModal(false);
    setSelectedAdmin(null);
    refetch();
    setMessage({ text: deleteMessage || 'Administrador eliminado correctamente', type: 'success' });
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

  // Generar informe PDF de los administradores
  const generarInformePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Informe de Administradores', 20, 20);
    
    const adminsData = filteredAdmins.map((admin) => [
      admin.nombre,
      admin.contacto,
      admin.direccion,
      admin.email,
    ]);

    doc.autoTable({
      head: [['Nombre', 'Contacto', 'Dirección', 'Email']],
      body: adminsData,
      startY: 30,
      styles: { fontSize: 12 },
      headStyles: { fillColor: [41, 128, 185] }, // Color de cabecera azul
    });

    doc.save('informe_administradores.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 flex justify-center px-4">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue text-white px-4 py-2 rounded-lg w-full md:w-auto"
            >
              Añadir Administrador
            </button>
            <button
              onClick={generarInformePDF}
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full md:w-auto"
            >
              Generar Informe PDF
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Añadir Administrador</h2>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  value={newAdmin.nombre}
                  onChange={handleCreateInputChange}
                  placeholder="Nombre"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="text"
                  name="contacto"
                  value={newAdmin.contacto}
                  onChange={handleCreateInputChange}
                  placeholder="Contacto"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="text"
                  name="direccion"
                  value={newAdmin.direccion}
                  onChange={handleCreateInputChange}
                  placeholder="Dirección"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={newAdmin.email}
                  onChange={handleCreateInputChange}
                  placeholder="Email"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleCreateInputChange}
                  placeholder="Contraseña"
                  className="border p-2 w-full rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-blue text-white px-4 py-2 rounded-lg w-full"
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
            className="w-full p-3 border rounded-lg mb-4"
          />

          <div className="divide-y">
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <div key={admin.id} className="flex flex-col md:flex-row justify-between items-center p-4">
                  <div className="flex flex-col text-center md:text-left mb-2 md:mb-0">
                    <p className="text-lg font-semibold text-gray-800">{admin.nombre}</p>
                    <p className="text-gray text-sm">{admin.email}</p>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  value={selectedAdmin.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="text"
                  name="contacto"
                  value={selectedAdmin.contacto}
                  onChange={handleInputChange}
                  placeholder="Contacto"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="text"
                  name="direccion"
                  value={selectedAdmin.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                  className="border p-2 w-full rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={selectedAdmin.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="border p-2 w-full rounded-lg"
                />
                <button type="submit" className="bg-blue text-white px-4 py-2 rounded-lg w-full">
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAdmin(null)}
                  className="bg-gray text-white px-4 py-2 rounded-lg w-full"
                >
                  Cancelar
                </button>
              </form>
            </div>
          )}

          {showDeleteModal && selectedAdmin && (
            <div className="fixed inset-0 bg-gray bg-opacity-50 flex justify-center items-center">
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
                    onClick={() => setShowDeleteModal(false)}
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
      </main>
      <Footer />
    </div>
  );
};

export default CRUDUsuarios;

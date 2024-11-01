import React, { useEffect, useState } from 'react';

const FormEliminarAdmin = ({ onClose }) => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAdmin, setSelectedAdmin] = useState(null);

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

    const handleDelete = async () => {
        if (!selectedAdmin) return;

        try {
            const response = await fetch(`https://ciclo-hidalgo-desarrollo.vercel.app/api/api/admin/delete/${selectedAdmin}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el administrador');
            }

            const result = await response.json();
            alert(result.message);
            onClose();
        } catch (error) {
            console.error('Error al eliminar el administrador:', error);
        }
    };

    if (loading) {
        return <p className="text-center">Cargando administradores...</p>;
    }

    const filteredAdmins = admins.filter(admin =>
        admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex items-center justify-center py-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Eliminar Administrador</h2>
                <p className="mb-4 text-center">Buscar administrador para eliminar:</p>

                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                />

                <ul className="max-h-40 overflow-y-auto border rounded mb-4">
                    {filteredAdmins.length > 0 ? (
                        filteredAdmins.map(admin => (
                            <li
                                key={admin.id}
                                className={`p-3 cursor-pointer admin-item ${selectedAdmin === admin.id ? 'bg-gray' : ''}`}
                                onClick={() => setSelectedAdmin(admin.id)}
                            >
                                {admin.nombre} ({admin.email})
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-center">No se encontraron administradores.</li>
                    )}
                </ul>

                {selectedAdmin && (
                    <div className="text-center">
                        <p className="mb-4">¿Está seguro de que desea eliminar a este administrador?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue transition duration-200"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormEliminarAdmin;


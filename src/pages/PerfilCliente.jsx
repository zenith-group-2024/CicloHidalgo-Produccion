import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../global/GlobalState';
import FetchUser from '../../hooks/FetchUser';
import { useUpdateUser } from '../../hooks/UserUpdate';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';
import { User, Pencil } from 'lucide-react';

const PerfilCliente = () => {
    const navigate = useNavigate(); 
    const { state } = useContext(GlobalContext);
    const { isAuthenticated } = state;

    const [formData, setFormData] = useState({
        nombre: '',
        contacto: '',
        email: '',
        direccion: '',
        cumpleanos: '',
        boletin: false,
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [editing, setEditing] = useState(false);

    const { formData: fetchedUserData, loading: userLoading } = FetchUser();
    const updateUserData = useUpdateUser();

    useEffect(() => {
        if (!userLoading && fetchedUserData) {
            setFormData({
                nombre: fetchedUserData.nombre || '',
                contacto: fetchedUserData.contacto || '',
                email: fetchedUserData.email || '',
                direccion: fetchedUserData.direccion || '',
                cumpleanos: fetchedUserData.cumpleanos || '',
                boletin: fetchedUserData.boletin || false,
            });
            setLoading(false);
        }
    }, [userLoading, fetchedUserData]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); 
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async () => {
        try {
            await updateUserData(formData);
            setEditing(false);
            setMessage('Datos actualizados correctamente.');

            setTimeout(() => {
                setMessage('');
            }, 2000);
        } catch (error) {
            setMessage('Error al actualizar los datos: ' + error.message);
            setTimeout(() => {
                setMessage('');
            }, 2000);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-600 font-semibold text-lg">Cargando datos...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <Navbar />
            <div className="mx-auto w-full max-w-6xl px-10 py-12">
                <div className="flex items-center text-gray-700 mb-8">
                    <User className="h-8 w-8 text-blue-600 mr-2" />
                    <h2 className="text-3xl font-bold text-left text-gray-800">
                        Datos Personales
                    </h2>
                </div>

                {message && <p className="text-left text-green-600 text-lg font-semibold mb-4">{message}</p>}

                <div className="bg-white rounded-2xl shadow-xl p-10 mx-auto w-full max-w-4xl">
                    

                    {editing ? (
                        <>
                            {Object.entries(formData).map(([key, value]) => (
                                <div className="mb-6" key={key}>
                                    <label htmlFor={key} className="block text-gray-600 font-semibold mb-2">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    {key === 'boletin' ? (
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                id={key}
                                                name={key}
                                                checked={value}
                                                onChange={handleChange}
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
                                            />
                                            <label htmlFor={key} className="text-gray-600">
                                                Suscribirme a ofertas y novedades
                                            </label>
                                        </div>
                                    ) : (
                                        <input
                                            type={key === 'cumpleanos' ? 'date' : 'text'}
                                            name={key}
                                            value={value}
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    )}
                                </div>
                            ))}

                            <button
                                onClick={handleSave}
                                className="mt-6 w-full bg-gray text-white rounded-lg font-bold py-3 shadow-lg"
                            >
                                Guardar Cambios
                            </button>
                        </>
                    ) : (
                        <div className="space-y-6 text-lg text-gray-700">
                            {Object.entries(formData).map(([key, value]) => (
                                <p key={key} className="flex justify-between items-center border-b border-gray-200 py-4">
                                    <strong className="text-gray-600 capitalize">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                    <span className="text-blue-700 font-semibold">
                                        {key === 'boletin' ? (value ? 'Sí' : 'No') : value.toString()}
                                    </span>
                                </p>
                            ))}
                            <button
                                onClick={() => setEditing(true)}
                                className="mt-6 w-full flex items-center justify-center bg-gray text-white font-bold py-3 rounded-lg shadow-lg"
                            >
                                <Pencil className="h-4 w-4 mr-2" /> Editar Perfil
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PerfilCliente;

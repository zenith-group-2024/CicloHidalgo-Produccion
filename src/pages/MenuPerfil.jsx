import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../global/GlobalState';
import FetchUser from '../../hooks/hooksUsuario/FetchUser';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';
import { Package, User, LogOut, Box, FileText, Users, Tag, LayoutDashboard, ShoppingBag } from 'lucide-react';


const MenuPerfil = () => {
    const navigate = useNavigate();
    const { state, logout } = useContext(GlobalContext);
    const { isAuthenticated } = state;

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { formData: fetchedUserData, loading: userLoading } = FetchUser();

    useEffect(() => {
        if (!userLoading && fetchedUserData) {
            setNombreUsuario(fetchedUserData.nombre || '');
            const isUserAdmin = fetchedUserData.admin === true;
            setIsAdmin(isUserAdmin);
        }
    }, [userLoading, fetchedUserData]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (userLoading) {
        return <p className="text-center text-gray-600 font-semibold text-lg">Cargando datos...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl p-10">
                    <h2 className="text-4xl font-bold font-primary mb-6 text-gray-800">Hola, {nombreUsuario}</h2>
                    <p className="text-gray mb-10 text-lg font-secondary leading-relaxed">
                        {isAdmin
                            ? 'Desde este panel de administración, puedes gestionar productos, contenido, usuarios, pedidos y ofertas.'
                            : 'Desde este panel, puedes revisar tus pedidos recientes, gestionar tus direcciones de envío y facturación, y actualizar tu contraseña e información personal de forma sencilla.'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-primary">
                        {isAdmin ? (
                            <>
                                <Card title="Gestionar Productos" icon={<Box size={40} className="text-blue" />} onClick={() => navigate('/gestionar-productos')} />
                                <Card title="Gestionar Contenido" icon={<FileText size={40} className="text-blue" />} onClick={() => navigate('/gestionarcontenido')} />
                                <Card title="Gestionar Usuarios" icon={<Users size={40} className="text-blue" />} onClick={() => navigate('/gestionarUsuarios')} />
                                <Card title="Gestionar Pedidos" icon={<ShoppingBag size={40} className="text-blue" />} onClick={() => navigate('/Pedidos')} />
                                <Card title="Dashboard" icon={<LayoutDashboard size={40} className="text-blue" />} onClick={() => navigate('/Dashboard')} />
                                <Card title="Gestionar Ofertas" icon={<Tag size={40} className="text-blue" />} onClick={() => navigate('/Ofertas')} />
                            </>
                        ) : (
                            <>
                                <Card title="Tus pedidos" icon={<Package size={40} className="text-blue" />} onClick={() => navigate('/ListaOrdenes')} />
                                <Card title="Datos personales" icon={<User size={40} className="text-blue" />} onClick={() => navigate('/PerfilCliente')} />
                            </>
                        )}
                        <Card title="Cerrar sesión" icon={<LogOut size={40} className="text-gray" />} onClick={handleLogout} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Card = ({ title, icon, onClick }) => (
    <div 
        onClick={onClick} 
        className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition transform hover:scale-105 duration-300 cursor-pointer"
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
);

export default MenuPerfil;
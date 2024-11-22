import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {

    const location = useLocation(); // Hook para obtener la ruta actual
    const isHomePage = location.pathname === '/'; // Verificar si la ruta actual es la página de inicio

    return (
        <footer className="bg-gray text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-start">

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Contacto</h2>
                        <p className="mb-3 text-lg">San Pedro de Poás, Alajuela, Costa Rica</p>
                        <p className="mb-3 text-lg">Teléfono: (+506) 2448-4946</p>
                        <p className="mb-3 text-lg">
                            Email:
                            <a href="mailto:ciclohidalgo@hotmail.com" className="hover:underline"> ciclohidalgo@hotmail.com</a>
                        </p>

                        {!isHomePage && (
                        <div className="flex space-x-4 mt-4">
                            <a
                                href={`https://wa.me/50683158021?text=${encodeURIComponent("¡Hola! Me gustaría obtener asistencia. ¿Podrían ayudarme?")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition-transform transform hover:scale-110"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={30} />
                            </a>

                            <a
                                href="https://www.facebook.com/share/R88QGPERJMBBC1QS/?mibextid=LQQJ4d"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition-transform transform hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook size={30} />
                            </a>
                            <a
                                href="https://www.instagram.com/ciclo_hidalgo?igsh=aDV3b2NpcWQ1eWpn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition-transform transform hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram size={30} />
                            </a>
                        </div>
                    )}
                    </div>
                  


                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Enlaces Rápidos</h2>
                        <ul>
                            <li className="mb-2">
                                <Link to="/" className="hover:underline text-lg">Inicio</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/Productos" className="hover:underline text-lg">Productos</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/Servicios" className="hover:underline text-lg">Servicios</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/Contenido" className="hover:underline text-lg">Contenido</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-lg">&copy; {new Date().getFullYear()} Ciclo Hidalgo. Todos los derechos reservados.</p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
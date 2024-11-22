import React from 'react';
import Navbar from '../UI/Navbar'; 
import Footer from '../UI/Footer';
import WhatsAppButton from '../UI/WhatsAppButton';

const Servicios = () => {
    const servicios = [
        {
            title: "Lavado y Engrase",
            description: "Limpieza a fondo de la bicicleta y engrase de componentes esenciales para su buen funcionamiento.",
        },
        {
            title: "Mantenimiento y Ajuste de Componentes",
            description: "Ajustamos y verificamos los componentes principales de tu bicicleta para asegurar su buen estado y rendimiento.",
        },
        {
            title: "Cambio de Piezas",
            description: "Sustituimos piezas desgastadas o dañadas con repuestos de alta calidad.",
        },
        {
            title: "Vueltas Ciclistas Nocturnas",
            description: "Únete a nuestras rutas nocturnas guiadas para disfrutar del ciclismo en un ambiente seguro.",
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <header className="bg-gradient-to-r from-gray to-old p-10 text-white text-center rounded-b-lg shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold font-primary tracking-wide">
                    Horario de Servicios
                </h1>
                <p className="text-xl md:text-2xl py-4 font-secondary tracking-wide">
                    Lunes a Viernes: 9:00 AM - 6:00 PM <br />
                    Sábados: 9:00 AM - 5:30 PM <br />
                    Domingo: Cerrado
                </p>
            </header>

            <main className="container mx-auto my-12 px-4">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {servicios.map((servicio, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="p-8">
                                <h3 className="text-2xl font-extrabold font-primary text-gray-900 mb-4">
                                    {servicio.title}
                                </h3>
                                <p className="text-lg text-gray mb-6 ">{servicio.description}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <footer className="mt-16 text-center">
                    <h2 className="text-2xl font-bold mb-6 font-primary text-whine">
                        Para más información sobre nuestros servicios o para agendar una cita, no dudes en contactarnos.
                    </h2>
                </footer>
            </main>
            <WhatsAppButton message="¡Hola! Estoy interesado/a en obtener más información sobre sus servicios." />
            <Footer />
        </div>
    );
};

export default Servicios;

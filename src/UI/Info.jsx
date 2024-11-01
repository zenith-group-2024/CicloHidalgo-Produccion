import React from 'react';
import { Truck, CirclePercent, MapPinned } from 'lucide-react';

const SectionThreeColumns = () => {
    return (
        <section className="py-16 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-stretch">
                    
                    <div className="flex-1 px-4 mb-8 md:mb-0">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <Truck size={100} className="mb-6 text-blue" />
                                <div className="absolute inset-y-0 right-0 w-2 bg-blue-500"></div>
                            </div>
                            <h1 className="font-bold text-2xl text-blue font-primary">Envíos</h1>
                            <p className="text-center mt-4 font-secondary text-lg">
                                Compra en línea y elige entre retirar en nuestra tienda o recibir tu paquete a través de Correos de Costa Rica. 
                                Nos enorgullece ofrecerte la mejor experiencia de compra y atención al cliente.
                            </p>
                        </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-r border-blue mx-4 mb-8 md:mb-0"></div>

                    <div className="flex-1 px-4 mb-8 md:mb-0">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <CirclePercent size={100} className="mb-6 text-blue" />
                            </div>
                            <h1 className="font-bold text-2xl text-blue font-primary">Nuestro Boletín</h1>
                            <p className="text-center mt-4 font-secondary text-lg">
                                ¡Suscríbete a nuestro boletín informativo y no te pierdas ninguna promoción especial! 
                                Valoramos tu lealtad y queremos asegurarnos de que estés siempre al tanto de nuestras promociones.
                            </p>
                        </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-r border-blue mx-4 mb-8 md:mb-0"></div>

                    <div className="flex-1 px-4 mb-8 md:mb-0">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <MapPinned size={100} className="mb-6 text-blue" />
                            </div>
                            <h1 className="font-bold text-2xl text-blue font-primary">Ubicación</h1>
                            <p className="text-center mt-4 font-secondary text-lg">
                                Visítanos en San Pedro de Poás, Alajuela, Costa Rica. 
                                En nuestra tienda, ubicada en una zona central y de fácil acceso, te ofrecemos una experiencia de compra única 
                                ¡Te esperamos!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionThreeColumns;

import React from 'react';
import hero from '../assets/images/hero.svg'; 
const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${hero})` }}
            ></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white">
                    Bicicletas que Marcan el Camino
                </h1>
                <p className="mt-4 text-base md:text-xl lg:text-2xl font-light text-white font-secondary">
                    Conquista cualquier terreno, con estilo y precisión.
                </p>
            </div>

            <div className="absolute inset-0 bg-black opacity-40"></div>
        </section>
    );
};

export default Hero;
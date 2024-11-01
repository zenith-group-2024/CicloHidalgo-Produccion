import React, { useRef, useEffect } from 'react';
import Card from '../UI/CardDestacado';
import { useFetchProductos } from '../../hooks/FetchProductos';

const ProductosDestacados = () => {
    const carouselRef = useRef(null);
    const { productos } = useFetchProductos();

    useEffect(() => {
        const carousel = carouselRef.current;
        const scrollStep = 1;
        const intervalTime = 15;

        const scrollInterval = setInterval(() => {
            if (carousel) {
                carousel.scrollLeft += scrollStep;

                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                    carousel.scrollLeft = 0;
                }
            }
        }, intervalTime);

        return () => clearInterval(scrollInterval);
    }, [productos.length]);

    const productosDestacados = productos.filter(producto => producto.destacado);

    return (
        <section className="bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 mt-20 text-center font-primary">Productos Destacados</h1>
            <div className="relative">
                <div
                    ref={carouselRef}
                    className="flex hide-scrollbar whitespace-nowrap overflow-hidden"
                >
                   {productosDestacados.map((producto) => (
                        <div key={producto.id} className="inline-block p-4">
                            <Card
                                nombre={producto.nombre}
                                id={producto.id}
                                title={producto.marca}
                                precio={`₡ ${producto.precio}`}
                                img={producto.imagen}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductosDestacados;

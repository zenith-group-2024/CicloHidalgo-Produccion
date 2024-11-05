import React, { useRef, useEffect } from 'react';
import Card from '../UI/CardDestacado';
import { useFetchProductos } from '../../hooks/FetchProductos';
import '../index.css';

const ProductosDestacados = () => {
    const carouselRef = useRef(null);
    const { productos } = useFetchProductos();
  
    const productosDestacados = productos.filter(producto => producto.destacado);
  
    const productosDuplicados = [...productosDestacados, ...productosDestacados];
  
    return (
      <section className="bg-white">
        <h1 className="text-3xl font-bold mb-6 mt-20 text-center font-primary">Productos Destacados</h1>
        <div className="carousel-container">
          <div ref={carouselRef} className="carousel">
            {productosDuplicados.map((producto) => (
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
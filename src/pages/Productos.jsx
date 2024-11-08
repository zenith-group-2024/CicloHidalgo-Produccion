import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from "../UI/CardProductos";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { CartContext } from '../UI/prueba_carrito.jsx';
import CheckBoxCategoria from '../UI/CheckBoxCategoria';
import loadingGif from '../assets/animaciones/AnimationLoading.gif';
import WhatsAppButton from '../UI/WhatsAppButton';
import { ChevronDown } from 'lucide-react';
import GlobalProductos from '../global/GlobalProductos.jsx';



export function Productos() {
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const globalProductos  = useContext(GlobalProductos)

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState(globalProductos);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const handleCategoryChange = useCallback((selected) => {
    setSelectedCategories(selected);
  }, []);

  const handleSubCategoryChange = useCallback((selected) => {
    setSelectedSubCategories(selected);
  }, []);

  const handleBrandChange = useCallback((selected) => {
    setSelectedBrands(selected);
  }, []);

  const handleToggleFiltros = () => {
    setCheckboxFiltros(!checkboxFiltros);
  };

  useEffect(() => {
    if (globalProductos.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setFilteredProductos(globalProductos);
        setIsLoading(false);
      }, 0);
    }
  }, [globalProductos]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = globalProductos.filter((producto) => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(producto.categoria);
        const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(producto.subcategoria);
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(producto.marca);
        return categoryMatch && subCategoryMatch && brandMatch;
      });
      setFilteredProductos(filtered);
    };

    filterProducts();
  }, [globalProductos ,selectedCategories, selectedSubCategories, selectedBrands]);

  useEffect(() => {
    if (globalProductos.length > 0) {
      setFilteredProductos(globalProductos);
    }
  }, [globalProductos]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };


  const [searchProducto, setSearchProducto] = useState('')
  const [productoFiltrados, setProductoFiltrados] = useState([])

  const isEmpty = (value) => {
    if (value == '') {
      return true
    } else {
      return false
    }
  }

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchProducto(searchTerm)

    const productoFiltrados = globalProductos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductoFiltrados(productoFiltrados);
  }

  const [checkboxFiltros, setCheckboxFiltros] = useState(false)
  const handleCheckboxFiltros = (e) => {
    if (e.target.checked) {
      setCheckboxFiltros(true)
    } else {
      setCheckboxFiltros(false)
    }
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProductos.length / productsPerPage)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-50 min-h-screen ">
      <Navbar />
      <div className="container mx-auto py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={filterVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-md shadow-md"
            variants={filterVariants}
          >
            <h2 className="font-secondary font-bold md:text-xl text-2xl text-gray-800 mb-4">
              Busqueda
            </h2>

            <div className="z-10 relative rounded-md flex items-center">
              <input
                type="text"
                value={searchProducto}
                onChange={handleInputChange}
                placeholder="Search..."
                className="lg:w-[445px] md:w-[140px] xxs:w-[245px] rounded-full px-4 py-2 md:py-1 border focus:outline-none border-black pr-10 mt-2 mb-2"
              />
            </div>

            <h1 className="lg:hidden xl:hidden md:hidden font-secondary font-bold text-2xl text-gray-800 mb-4">
              Filtros
            </h1>
            <div className='lg:hidden xl:hidden md:hidden'>
              <div className="flex items-center">
                <button
                  onClick={handleToggleFiltros}
                  className="flex items-center focus:outline-none"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-blue-600 ${checkboxFiltros ? 'transform rotate-180' : ''}`}
                  />
                  <span className="text-gray-700 ml-2">{checkboxFiltros ? 'Ver Más' : 'Ver Menos'}</span>
                </button>
              </div>
            </div>

            <div className={checkboxFiltros ? 'hidden' : 'block'}>
              <CheckBoxCategoria
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={handleSubCategoryChange}
                onBrandChange={handleBrandChange}
              />
            </div>

          </motion.div>

          <div className="md:col-span-3 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
            {isEmpty(searchProducto)
              ? isLoading ? (
                <div className="flex justify-center items-center col-span-full">
                  <img src={loadingGif} alt="Loading" className="w-20 h-20" />
                </div>
              ) : currentProducts.length === 0 ? (
                <p className="text-center text-gray-600">
                  No hay productos disponibles.
                </p>
              ) : (
                currentProducts.map((producto) => (
                  <motion.div
                    key={producto.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Card producto={producto} addToCart={addToCart} />
                  </motion.div>
                ))
              )

              : isLoading ? (
                <div className="flex justify-center items-center col-span-full">
                  <img src={loadingGif} alt="Loading" className="w-20 h-20" />
                </div>
              ) : productoFiltrados.length === 0 ? (
                <p className="text-center text-gray-600">
                  No se encontraron productos.
                </p>
              ) : (
                productoFiltrados.map((producto) => (
                  <motion.div
                    key={producto.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Card producto={producto} addToCart={addToCart} />
                  </motion.div>
                ))
              )}
              
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center mt-4 mb-4">
                    <button
                        className="px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-600"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2">Página {currentPage}</span>
                    <button
                        className="px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-600"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(globalProductos.length / productsPerPage)}
                    >
                        Siguiente
                    </button>
                </div>

      <WhatsAppButton message="¡Hola! Estoy interesado/a en obtener más información sobre sus productos." />
      <Footer />
    </div>
  );
}

export default Productos;
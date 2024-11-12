import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React,{useEffect,useState} from 'react';
import HomePage from './pages/HomePage';
import Contenido from './pages/Contenido';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import AdminDashboard from './UI/VistaCRUDs.jsx';
import AdminCRUD from './UI/AdminCRUD';
import { Carrito } from './pages/Carrito';
import { CartProvider } from './UI/prueba_carrito.jsx';
import DetalleProducto from './UI/DetalleProducto';
import PerfilCliente from './pages/PerfilCliente.jsx';
import { GlobalProvider } from '../src/global/GlobalState.jsx';
import MenuPerfil from './pages/MenuPerfil.jsx';
import ListAdmins from './UI/ListAdmins.jsx';
import Orden from './pages/Orden';
import Dashboard from './pages/Dashboard.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListaOrdenes from './pages/ListaOrdenes.jsx';
import CRUDProductos from '../src/UI/CRUDProductos.jsx';
import CRUDContenido from '../src/UI/CRUDContenido.jsx';
import Pedidos from './pages/GestionPedidos.jsx';
import { useFetchProductos } from '../hooks/FetchProductos.js'
import {GlobalProductos, GlobalProductosDestacados} from './global/GlobalProductos.jsx'
import CRUDUsuarios from './UI/CRUDUsuarios.jsx';
import Ofertas from './pages/Ofertas.jsx';
import FormEditarProducto from './forms/EditarProducto.jsx';
import { useFetchDestacados } from '../hooks/useFetchDestacados.js';

function App() {

 

const [productosMap, setProductosMap] = useState([]);
const {productos} = useFetchProductos();

const [destacadosMap, setDestacadosMap] = useState([]);
const {productosDestacados} = useFetchDestacados();


useEffect(() =>{

  const crearProductos = () => {
    const productosFetch = productos.map(producto => ({
        value : producto.id,
        id : producto.id,
        nombre : producto.nombre,
        marca: producto.marca,
        especificacion: producto.especificacion,
        subcategoria: producto.subcategoria,
        categoria: producto.categoria,
        modelo: producto.modelo,
        precio: producto.precio,
        codigo_barras: producto.codigo_barras,
        descuento: producto.descuento,
        cantidad: producto.cantidad,
        destacado: producto.destacado,
        imagen : producto.imagen

    }))

    const destacadosFetch = productosDestacados.map(producto => ({
      value : producto.id,
      id : producto.id,
      nombre : producto.nombre,
      marca: producto.marca,
      especificacion: producto.especificacion,
      subcategoria: producto.subcategoria,
      categoria: producto.categoria,
      modelo: producto.modelo,
      precio: producto.precio,
      codigo_barras: producto.codigo_barras,
      descuento: producto.descuento,
      cantidad: producto.cantidad,
      destacado: producto.destacado,
      imagen : producto.imagen

  }))

    setDestacadosMap(destacadosFetch)
    setProductosMap(productosFetch)
  }
  
  crearProductos();
},[productos])

  return (
    <BrowserRouter>
      <CartProvider>
      <GlobalProductosDestacados.Provider value={destacadosMap}>
      <GlobalProductos.Provider value={productosMap}>
        <GlobalProvider>
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to = "/"/>} />
            <Route path="/Contenido" element={<Contenido />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Servicios" element={<Servicios />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/PerfilCliente" element={<PerfilCliente />} />
            <Route path="/MenuPerfil" element={<MenuPerfil />} />
            <Route path="/Orden" element={<Orden />} />
            <Route path="/admin/lista" element={<ListAdmins />} />
            <Route path="/ListaOrdenes" element={<ListaOrdenes />} />
            <Route path="/gestionar-productos" element={<CRUDProductos />} />
            <Route path="/gestionarcontenido" element={<CRUDContenido />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Pedidos" element={<Pedidos />} />
            <Route path="/gestionarUsuarios" element={<CRUDUsuarios />} />
            <Route path="Ofertas" element={<Ofertas />}/>
            <Route path="/Editar/:id" element={<FormEditarProducto/>}/>
          </Routes>

        </GlobalProvider>
        </GlobalProductos.Provider>
        </GlobalProductosDestacados.Provider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
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
import FormEditarAdmin from './forms/FormEditarAdmin.jsx';
import Orden from './pages/Orden';
import Dashboard from './pages/Dashboard.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListaOrdenes from './pages/ListaOrdenes.jsx';
import CRUDProductos from '../src/UI/CRUDProductos.jsx';
import CRUDContenido from '../src/UI/CRUDContenido.jsx';
import Pedidos from './pages/GestionPedidos.jsx';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalProvider>
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Contenido" element={<Contenido />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Servicios" element={<Servicios />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/crud/:resource" element={<AdminCRUD />} />
            <Route path="/PerfilCliente" element={<PerfilCliente />} />
            <Route path="/MenuPerfil" element={<MenuPerfil />} />
            <Route path="/Orden" element={<Orden />} />
            <Route path="/admin/lista" element={<ListAdmins />} />
            <Route path="/admin/editar/:id" element={<FormEditarAdmin />} />
            <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            <Route path="/ListaOrdenes" element={<ListaOrdenes />} />
            <Route path="/gestionar-productos" element={<CRUDProductos />} />
            <Route path="/gestionarcontenido" element={<CRUDContenido />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Pedidos" element={<Pedidos />} />
          
            
          </Routes>

        </GlobalProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

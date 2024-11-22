import React, { useEffect, useState , useContext} from 'react';
import Footer from '../UI/Footer';
import Navbar from '../UI/Navbar';
import ProductosMasVendidos from '../UI/ProductosMasVendidos';
import UltimosUsuariosRegistrados from '../UI/VistaUsuariosRegistrados';
import ListaPedidos from '../UI/VistaPedidos';
import { GlobalContext } from '../global/GlobalState.jsx';
import {GlobalProductos} from '../global/GlobalProductos';

import { fetchTopProductos, fetchUsuarios, fetchPedidos } from "../../hooks/hooksDashboard/dashboardHooks.js";

const Dashboard = () => {
  const { state} = useContext(GlobalContext);
  const { isAdmin } = state;
  const globalProductos = useContext(GlobalProductos);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(0);
  const [ultimosUsuarios, setUltimosUsuarios] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [pedidosCompletados, setPedidosCompletados] = useState([]);

  useEffect(() => {
    fetchTopProductos(globalProductos, setProductosMasVendidos);
    fetchUsuarios(setUsuariosRegistrados, setUltimosUsuarios);
    fetchPedidos(setTotalPedidos, setPedidosPendientes, setPedidosCompletados);
  }, [globalProductos]);

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const renderCardInfo = (title, value, color) => (
    <div className={`p-8 rounded-2xl shadow-lg ${color} text-white hover:shadow-2xl transform transition-all`}>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );

  if (!isAdmin) {
    return (        
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow p-4 sm:p-6 bg-gray-50">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 sm:mt-8 mb-4 sm:mb-8 text-center text-old font-primary text-red">Acceso Denegado</h2>
        </div>
        <Footer />
    </div>); }
    else {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
      <Navbar />
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCardInfo('Total de Productos', globalProductos.length, 'bg-gradient-to-tr from-gray to-light')}
              {renderCardInfo('Pedidos Realizados', totalPedidos, 'bg-gradient-to-tr from-blue to-blue')}
              {renderCardInfo('Usuarios Registrados', usuariosRegistrados, 'bg-gradient-to-tr from-gray to-light')}
            </div>
          </div>

          <ProductosMasVendidos productos={productosMasVendidos} />
          <UltimosUsuariosRegistrados usuarios={ultimosUsuarios} />
          
          
          <ListaPedidos
            pedidosPendientes={pedidosPendientes}
            pedidosCompletados={pedidosCompletados}
            formatFecha={formatFecha}
          />
        </div>
      </main>
      <Footer />
    </div>
  );}
};

export default Dashboard;
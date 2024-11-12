import React, { useEffect, useState , useContext} from 'react';
import Footer from '../UI/Footer';
import Navbar from '../UI/Navbar';
import ProductosMasVendidos from '../UI/ProductosMasVendidos';
import UltimosUsuariosRegistrados from '../UI/VistaUsuariosRegistrados';
import ListaPedidos from '../UI/VistaPedidos';
import {GlobalProductos} from '../global/GlobalProductos';

const Dashboard = () => {
  const globalProductos = useContext(GlobalProductos);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(0);
  const [ultimosUsuarios, setUltimosUsuarios] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [pedidosCompletados, setPedidosCompletados] = useState([]);

  useEffect(() => {
    fetchTopProductos();
    fetchUsuarios();
    fetchPedidos();
  }, []);

  const fetchTopProductos = async () => {
    try {
      const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/top-productos');
      if (response.ok) {
        const data = await response.json();
        const productosWithImages = data.top_productos.map((producto) => {
          const productoContext = globalProductos.find((p) => p.id === producto.id);
          return {
            id: producto.id,
            nombre: producto.nombre,
            vendidos: producto.total_cantidad,
            imagen: productoContext ? productoContext.imagen : null, // Usar imagen del contexto si está disponible
          };
        });
        setProductosMasVendidos(productosWithImages);
      } else {
        console.error('Error al obtener productos más vendidos');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/obtener-usuarios`);
      const data = await response.json();
      setUsuariosRegistrados(data.length);
      setUltimosUsuarios(data.slice(-5).reverse());
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/ordenes/all`);
      const data = await response.json();
      setTotalPedidos(data.length);
      setPedidosPendientes(data.filter((p) => p.estado === 'PENDIENTE'));
      setPedidosCompletados(data.filter((p) => p.estado === 'COMPLETO'));
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
      <Navbar />
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCardInfo('Total de Productos', globalProductos.length, 'bg-gradient-to-tr from-gray to-light')} {/* Usamos el total del contexto */}
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
  );
};

export default Dashboard;
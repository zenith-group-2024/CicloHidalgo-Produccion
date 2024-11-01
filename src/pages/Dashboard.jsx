import React, { useEffect, useState } from 'react';
import Footer from '../UI/Footer';
import Navbar from '../UI/Navbar';
import { Clock, CheckCircle } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Dashboard = () => {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [pedidosCompletados, setPedidosCompletados] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTotalProductos();
    fetchTopProductos();
    fetchPedidos();
    fetchUsuarios();
  }, []);

  const fetchTotalProductos = async () => {
    try {
      const response = await fetch(`https://ciclo-hidalgo-desarrollo.vercel.app/api/api/productos/all`);
      const data = await response.json();
      setTotalProductos(data.productos.length);
    } catch (error) {
      console.error('Error al obtener el total de productos:', error);
    }
  };

  const fetchTopProductos = async () => {
    try {
      const response = await fetch('https://ciclo-hidalgo-desarrollo.vercel.app/api/api/top-productos');
      if (response.ok) {
        const data = await response.json();
        setProductosMasVendidos(
          data.top_productos.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            vendidos: producto.total_cantidad,
            imagen: producto.imagen,
          }))
        );
      } else {
        console.error("Error al obtener productos más vendidos");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch(`https://ciclo-hidalgo-desarrollo.vercel.app/api/api/ordenes/all`);
      const data = await response.json();
      setPedidosPendientes(data.filter(p => p.estado === 'PENDIENTE'));
      setPedidosCompletados(data.filter(p => p.estado === 'COMPLETO'));
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`https://ciclo-hidalgo-desarrollo.vercel.app/api/api/obtener-usuarios`);
      const data = await response.json();
      setUsuariosRegistrados(data.length);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const pedidosPendientesFiltrados = pedidosPendientes.filter((pedido) =>
    `${pedido.nombre} ${pedido.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()));
  const pedidosCompletadosFiltrados = pedidosCompletados.filter((pedido) =>
    `${pedido.nombre} ${pedido.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleVerDetalles = (pedidoId) => {
    setOrdenSeleccionada(ordenSeleccionada === pedidoId ? null : pedidoId);
  };

  const toggleEstadoPedido = async (pedidoId, estadoActual) => {
    try {
      const nuevoEstado = estadoActual === 'PENDIENTE' ? 'COMPLETO' : 'PENDIENTE';
      const response = await fetch(`http://127.0.0.1:8000/api/toggle-estado-orden/${pedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        fetchPedidos(); // Refresca la lista de pedidos
      } else {
        console.error('Error al cambiar el estado de la orden');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const mostrarCampo = (titulo, valor) => {
    if (valor) {
      return <p className="text-gray-700"><strong>{titulo}:</strong> {valor}</p>;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
      <Navbar />

      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto space-y-12">


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderCardInfo('Total de Productos', totalProductos, 'bg-gradient-to-tr from-gray to-light')}
            {renderCardInfo('Pedidos Pendientes', pedidosPendientes.length, 'bg-gradient-to-tr from-red to-red')}
            {renderCardInfo('Pedidos Completados', pedidosCompletados.length, 'bg-gradient-to-tr from-green-600 to-green-600')}
            {renderCardInfo('Usuarios Registrados', usuariosRegistrados, 'bg-gradient-to-tr from-gray to-light')}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl ">
            <h2 className="text-2xl font-bold mb-6 text-old border-b border-gray pb-4">Productos Más Vendidos</h2>
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="p-4 text-left font-medium text-gray uppercase tracking-wide border-b border-gray-300">Producto</th>
                  <th className="p-4 text-left font-medium text-gray uppercase tracking-wide border-b border-gray-300">Cantidad Vendida</th>
                </tr>
              </thead>
              <tbody>
                {productosMasVendidos.map((producto) => (
                  <tr key={producto.id} className="bg-white  shadow-sm rounded-lg ">
                    <td className="p-4 text-gray flex items-center space-x-4 border border-gray rounded-l-lg">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="h-14 w-14 object-cover rounded-md shadow-sm transition-transform "
                      />
                      <span className="font-semibold text-black  transition">{producto.nombre}</span>
                    </td>
                    <td className="p-4 text-black font-medium text-lg border border-gray rounded-r-lg  transition">
                      {producto.vendidos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg transform hover:shadow-2xl max-w-6xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-old border-b border-gray-200 pb-4">Pedidos</h2>
    <input
        type="text"
        placeholder="Buscar pedidos por nombre o apellido..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-3 border border-gray rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pedidos Pendientes */}
        <div className="bg-light p-6 rounded-2xl shadow-md hover:shadow-lg">
            <div className="flex items-center mb-6">
                <Clock className="text-yellow-400 h-7 w-7 mr-2" />
                <h3 className="text-xl font-semibold text-white">Pedidos Pendientes ({pedidosPendientesFiltrados.length})</h3>
            </div>
            <div className="space-y-4">
                {pedidosPendientesFiltrados.map((pedido) => (
                    <div key={pedido.id} className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-700">{pedido.nombre} {pedido.apellido}</p>
                                <p className="text-sm text-gray-500">{formatFecha(pedido.created_at)}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="text-old border px-2 py-1 rounded-full text-sm flex items-center space-x-1 shadow-md hover:shadow-sm transition-all"
                                    onClick={() => handleVerDetalles(pedido.id)}
                                >
                                    <span>{ordenSeleccionada === pedido.id ? 'Ocultar' : 'Ver Detalles'}</span>
                                    {ordenSeleccionada === pedido.id ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    className="text-green-600 border border-green-300 bg-green-50 px-2 py-1 rounded-full text-sm flex items-center shadow-md hover:shadow-sm transition-all"
                                    onClick={() => toggleEstadoPedido(pedido.id, pedido.estado)}
                                >
                                    <CheckCircle className="h-4 w-4 mr-1" /> Completar
                                </button>
                            </div>
                        </div>
                        {ordenSeleccionada === pedido.id && (
                            <div className="mt-4 space-y-2 text-gray-600">
                                {mostrarCampo("ID del pedido", pedido.id)}
                                {mostrarCampo("Método de Pago", pedido.metodo_pago)}
                                {mostrarCampo("Teléfono", pedido.telefono)}
                                {mostrarCampo("Dirección", pedido.direccion)}
                                {mostrarCampo("Provincia", pedido.provincia)}
                                {mostrarCampo("Ciudad", pedido.ciudad)}
                                {mostrarCampo("Código Postal", pedido.codigo_postal)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Pedidos Completados */}
        <div className="bg-light p-6 rounded-2xl shadow-md hover:shadow-lg">
            <div className="flex items-center mb-6">
                <CheckCircle className="text-green-400 h-7 w-7 mr-2" />
                <h3 className="text-xl font-semibold text-white">Pedidos Completados ({pedidosCompletadosFiltrados.length})</h3>
            </div>
            <div className="space-y-4">
                {pedidosCompletadosFiltrados.map((pedido) => (
                    <div key={pedido.id} className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-700">{pedido.nombre} {pedido.apellido}</p>
                                <p className="text-sm text-gray-500">▸ {formatFecha(pedido.created_at)}</p>
                                <p className="text-sm text-gray-500">▹ {formatFecha(pedido.updated_at)}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="text-old border px-2 py-1 rounded-full text-sm flex items-center space-x-1 shadow-md hover:shadow-sm transition-all"
                                    onClick={() => handleVerDetalles(pedido.id)}
                                >
                                    <span>{ordenSeleccionada === pedido.id ? 'Ocultar' : 'Ver Detalles'}</span>
                                    {ordenSeleccionada === pedido.id ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    className="text-yellow-600 border border-yellow-300 bg-yellow-50 px-2 py-1 rounded-full text-sm flex items-center shadow-md hover:shadow-sm transition-all"
                                    onClick={() => toggleEstadoPedido(pedido.id, pedido.estado)}
                                >
                                    <Clock className="h-4 w-4 mr-1" /> Pendiente
                                </button>
                            </div>
                        </div>
                        {ordenSeleccionada === pedido.id && (
                            <div className="mt-4 space-y-2 text-gray-600">
                                {mostrarCampo("ID del pedido", pedido.id)}
                                {mostrarCampo("Método de Pago", pedido.metodo_pago)}
                                {mostrarCampo("Teléfono", pedido.telefono)}
                                {mostrarCampo("Dirección", pedido.direccion)}
                                {mostrarCampo("Provincia", pedido.provincia)}
                                {mostrarCampo("Ciudad", pedido.ciudad)}
                                {mostrarCampo("Código Postal", pedido.codigo_postal)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    </div>
</div>


        </div>
      </main>

      <Footer />
    </div>
  );
};

const renderCardInfo = (title, value, color) => (
  <div className={`p-8 rounded-2xl shadow-lg ${color} text-white hover:shadow-2xl transform transition-all`}>
    <h3 className="text-lg font-medium mb-1">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default Dashboard;

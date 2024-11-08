import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';

const Pedidos = () => {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [pedidosCompletados, setPedidosCompletados] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/ordenes/all`);
      const data = await response.json();
      setPedidosPendientes(data.filter(p => p.estado === 'PENDIENTE'));
      setPedidosCompletados(data.filter(p => p.estado === 'COMPLETO'));
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const toggleEstadoPedido = async (pedidoId, estadoActual) => {
    try {
      const nuevoEstado = estadoActual === 'PENDIENTE' ? 'COMPLETO' : 'PENDIENTE';
      const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/toggle-estado-orden/${pedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        fetchPedidos();
      } else {
        console.error('Error al cambiar el estado de la orden');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const pedidosPendientesFiltrados = pedidosPendientes.filter((pedido) =>
    `${pedido.nombre} ${pedido.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pedidosCompletadosFiltrados = pedidosCompletados.filter((pedido) =>
    `${pedido.nombre} ${pedido.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerDetalles = (pedidoId) => {
    setOrdenSeleccionada(ordenSeleccionada === pedidoId ? null : pedidoId);
  };

  const mostrarCampo = (titulo, valor) => {
    if (valor) {
      return <p className="text-gray-700"><strong>{titulo}:</strong> {valor}</p>;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl max-w-6xl mx-auto  ">
          <input
            type="text"
            placeholder="Buscar pedidos por nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pedidos Pendientes */}
            <div className="bg-yellow-50 p-6 rounded-2xl shadow-md hover:shadow-lg">
              <div className="flex items-center mb-6">
                <Clock className="text-yellow-500 h-7 w-7 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Pedidos Pendientes ({pedidosPendientesFiltrados.length})</h3>
              </div>
              <div className="space-y-4">
                {pedidosPendientesFiltrados.map((pedido) => (
                  <div key={pedido.id} className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{pedido.nombre} {pedido.apellido}</p>
                        <p className="text-sm text-gray-500">{formatFecha(pedido.created_at)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-blue border border-blue px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transition-all"
                          onClick={() => handleVerDetalles(pedido.id)}
                        >
                          <span>{ordenSeleccionada === pedido.id ? 'Ocultar' : 'Ver Detalles'}</span>
                          {ordenSeleccionada === pedido.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        <button
                          className="text-green-600 border border-green-400 bg-green-100 px-2 py-1 rounded-full text-sm font-medium flex items-center shadow-md hover:shadow-lg transition-all"
                          onClick={() => toggleEstadoPedido(pedido.id, pedido.estado)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> Completar
                        </button>
                      </div>
                    </div>
                    {ordenSeleccionada === pedido.id && (
                      <div className="mt-4 space-y-2 text-gray-700">
                        {mostrarCampo("ID del pedido", pedido.id)}
                        {mostrarCampo("Método de Pago", pedido.metodo_pago)}
                        {mostrarCampo("Teléfono", pedido.telefono)}
                        {mostrarCampo("Dirección", pedido.direccion)}
                        {mostrarCampo("Provincia", pedido.provincia)}
                        {mostrarCampo("Ciudad", pedido.ciudad)}
                        {mostrarCampo("Código Postal", pedido.codigo_postal)}
                        {/* Lista de productos */}
                        <h4 className="font-semibold mt-2">Productos en la Orden:</h4>
                        <ul className="list-disc pl-5">
                          {pedido.productos && pedido.productos.map((producto) => (
                            <li key={producto.id} className="text-gray-800">
                              <p>{producto.nombre}</p>
                              <p>Cantidad: {producto.pivot.cantidad}</p>
                              <p>₡{producto.pivot.precio}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pedidos Completados */}
            <div className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-lg">
              <div className="flex items-center mb-6">
                <CheckCircle className="text-green-500 h-7 w-7 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Pedidos Completados ({pedidosCompletadosFiltrados.length})</h3>
              </div>
              <div className="space-y-4">
                {pedidosCompletadosFiltrados.map((pedido) => (
                  <div key={pedido.id} className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg  ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{pedido.nombre} {pedido.apellido}</p>
                        <p className="text-sm text-gray-500">▸ {formatFecha(pedido.created_at)}</p>
                        <p className="text-sm text-gray-500">▹ {formatFecha(pedido.updated_at)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-blue border border-blue px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transition-all"
                          onClick={() => handleVerDetalles(pedido.id)}
                        >
                          <span>{ordenSeleccionada === pedido.id ? 'Ocultar' : 'Ver Detalles'}</span>
                          {ordenSeleccionada === pedido.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        <button
                          className="text-yellow-600 border border-yellow-400 bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium flex items-center shadow-md hover:shadow-lg transition-all"
                          onClick={() => toggleEstadoPedido(pedido.id, pedido.estado)}
                        >
                          <Clock className="h-4 w-4 mr-1" /> Pendiente
                        </button>
                      </div>
                    </div>
                    {ordenSeleccionada === pedido.id && (
                      <div className="mt-4 space-y-2 text-gray-700">
                        {mostrarCampo("ID del pedido", pedido.id)}
                        {mostrarCampo("Método de Pago", pedido.metodo_pago)}
                        {mostrarCampo("Teléfono", pedido.telefono)}
                        {mostrarCampo("Dirección", pedido.direccion)}
                        {mostrarCampo("Provincia", pedido.provincia)}
                        {mostrarCampo("Ciudad", pedido.ciudad)}
                        {mostrarCampo("Código Postal", pedido.codigo_postal)}
                        {/* Lista de productos */}
                        <h4 className="font-semibold mt-2">Productos en la Orden:</h4>
                        <ul className="list-disc pl-5">
                          {pedido.productos && pedido.productos.map((producto) => (
                            <li key={producto.id} className="text-gray-800">
                              <p>{producto.nombre}</p>
                              <p>Cantidad: {producto.pivot.cantidad}</p>
                              <p>₡{producto.pivot.precio}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pedidos;
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../UI/prueba_carrito.jsx";
import { Truck, Store } from "lucide-react";
import Navbar from "../UI/Navbar.jsx";
import Footer from "../UI/Footer.jsx";
import { GlobalContext } from '../global/GlobalState.jsx';
import FetchUser from "../../hooks/FetchUser.js";
import WhatsAppButton from "../UI/WhatsAppButton.jsx";

function FormularioEnvio() {
  const { state } = useContext(GlobalContext);
  const { cart, setCart } = useContext(CartContext);
  const [envio, setEnvio] = useState("envia");
  const [pago, setPago] = useState("sinpe");
  const [formOrdenData, setFormData] = useState({
    user_id: state.id || "",
    metodo_envio: "envia",
    metodo_pago: "sinpe",
    productos: cart.map(item => ({ id: item.id, cantidad: item.quantity })),
  });
  const capitalize = (str) => str.replace(/\b\w/g, char => char.toUpperCase());
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { formData: userData, loading: userLoading } = FetchUser();
  const [whatsappMessage, setWhatsappMessage] = useState("Hola! Quisiera información sobre un pedido.");

  useEffect(() => {
    // Asignar user_id solo si el usuario está autenticado
    if (state.id) {
      setFormData(prevData => ({ ...prevData, user_id: state.id }));
    }
  }, [state.id]);

  const getTotal = () => cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFinalizarOrden = async (e) => {
    e.preventDefault();


    // Si el método de envío es "retiro", elimina los campos de dirección
    if (formOrdenData.metodo_envio === "retiro") {
      formOrdenData.direccion = null;
      formOrdenData.direccion_detalles = null;
      formOrdenData.provincia = null;
      formOrdenData.ciudad = null;
      formOrdenData.codigo_postal = null;
    }

    try {
      console.log(formOrdenData);
      const response = await fetch('http://127.0.0.1:8000/api/registrar-orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formOrdenData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setWhatsappMessage("Hola! Acabo de realizar un pedido.");
      } else {
        const data = await response.json();
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowModal(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true); // Abre el modal de confirmación
  };

  const handleEnvioChange = (envioSeleccionado) => {
    setEnvio(envioSeleccionado);
    setFormData(prevData => ({ ...prevData, metodo_envio: envioSeleccionado }));
  };

  const handlePagoChange = (pagoSeleccionado) => {
    setPago(pagoSeleccionado);
    setFormData(prevData => ({ ...prevData, metodo_pago: pagoSeleccionado }));
  };

  const closeModal = () => setShowModal(false);

 /*  if (userLoading) return <>
  <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-semibold text-center text-blue italic mx-auto">Redirigiendo...</p>
      <div className="my-6 w-10 h-10 border-4 border-dashed rounded-full animate-spin border-red"></div>
      <p className="mx-auto text-center text-gray-500">Si experimentas problemas de carga es porque no has iniciado sesión.</p>
    </div>
    <Footer />
    </>; */

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-6 flex-1">

        {/* Sección de Pedido */}
        <div className="w-full lg:w-1/3 bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Tu Pedido</h2>
          {cart.length === 0 ? (
            <p>Carrito vacío</p>
          ) : (
            cart.map((producto, index) => (
              <div key={index} className="flex items-center mb-6">
                <div className="relative w-20 h-20">
                  <img src={producto.imagen} alt={producto.title} className="w-full h-full rounded-lg object-contain" />
                  <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {producto.quantity}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{producto.title}</h4>
                  <p>{`₡${producto.precio * producto.quantity}`}</p>
                </div>
              </div>
            ))
          )}
          <div className="flex justify-between items-center mt-8">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-semibold">{`₡${getTotal()}`}</span>
          </div>
        </div>

        {/* Formulario de Envío */}
        <form className="w-full lg:w-2/3 bg-white rounded-lg p-6 sm:p-8 shadow-md" onSubmit={openModal} >
          <h2 className="text-2xl font-semibold mb-6">Cuenta</h2>
          <input type="email" value={userData?.email || "Sesión no iniciada!"} className="w-full border p-3 mb-6 rounded-lg bg-gray-50" readOnly />
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            {envio === "envia" ? <Truck className="w-6 h-6 mr-2 text-blue" /> : <Store className="w-6 h-6 mr-2 text-blue" />}
            Entrega
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {["envia", "retiro"].map(type => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="entrega"
                  value={type}
                  checked={envio === type}
                  onChange={() => handleEnvioChange(type)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-gray-700">{type === "envia" ? "Envío" : "Retiro en tienda"}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {["nombre", "apellido", "telefono"].map(field => (
              <div key={field}>
                <label className="block text-gray-700 mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={formOrdenData[field] || ""}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>

          {envio === "envia" && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formOrdenData.direccion || ""}
                  onChange={handleChange}
                  placeholder="Dirección"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Casa, apartamento, etc. (opcional)</label>
                <input
                  type="text"
                  name="direccion_detalles"
                  value={formOrdenData.direccion_detalles || ""}
                  onChange={handleChange}
                  placeholder="Detalles"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {["provincia", "ciudad", "codigo_postal"].map(field => (
                  <div key={field}>
                    <label className="block text-gray-700 mb-2">{capitalize(field.replace("_", " "))}</label>
                    <input
                      type="text"
                      name={field}
                      value={formOrdenData[field] || ""}
                      onChange={handleChange}
                      placeholder={capitalize(field.replace("_", " "))}
                      className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={field !== "codigo_postal"}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="text-2xl font-semibold mb-4">Pago</h3>
          <p className="text-sm text-gray-600 mb-6">Este sitio web solo registra tu pedido. Te invitamos a comunicarte con nosotros por WhatsApp para coordinar el pago.</p>
          <div className="border border-gray-300 rounded-lg p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["SINPE Móvil", "Efectivo", "Credomatic (Tasa 0)", "Banco Nacional", "Mini Cuotas Banco Nacional"].map(type => (
              <label key={type} className="flex items-center mb-4 cursor-pointer">
                <input
                  type="radio"
                  name="pago"
                  value={type}
                  checked={pago === type}
                  onChange={() => handlePagoChange(type)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-3 text-gray-700">{capitalize(type)}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="w-full font-medium bg-blue hover:bg-red text-white py-3 rounded-lg mt-6 flex items-center justify-center transition-colors duration-200">
            Finalizar Pedido
          </button>
        </form>

        
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-transform duration-300 ease-out scale-105">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Confirmar Pedido</h2>
              <p className="text-gray-700 text-center mb-8">¿Estás seguro de que deseas finalizar el pedido?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105">
                  Cancelar
                </button>
                <button
                  onClick={handleFinalizarOrden}
                  className="px-6 py-2 bg-red text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        
        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center transform transition-transform duration-300 ease-out scale-105">
              <h2 className="text-2xl font-bold mb-4 text-green-600">¡Pedido realizado con éxito!</h2>
              <p className="text-gray-700 mb-8">
                Por favor, comunícate con nosotros por medio de WhatsApp para finalizar el pago.
              </p>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="px-6 py-3 bg-gray  text-white rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
        <WhatsAppButton message="¡Hola! Acabo de realizar un pedido y quisiera confirmar los detalles." />
      </div>
      <Footer />
    </div>
  );
}

export default FormularioEnvio;

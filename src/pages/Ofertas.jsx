import { useState } from "react";
import AnadirOferta from '../forms/AnadirOferta.jsx';
import EditarOferta from '../forms/EditarOferta.jsx';
import EliminarOferta from '../forms/EliminarOferta.jsx';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';

export default function Ofertas() {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case "add":
                return <AnadirOferta />;
            case "edit":
                return <EditarOferta />;
            case "delete":
                return <EliminarOferta />;
            default:
                return <p>Selecciona una acción para gestionar las ofertas.</p>;
        }
    };

    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center min-h-[80vh]">
            
            
            <div className="flex mx-auto items-center justify-center gap-4 max-w-[50vh]" style={{ textAlign: "center", margin: "20px 0" }}>
                <button className="bg-blue text-white px-4 py-2 min-w-[10rem] rounded-full hover:bg-red transition w-full" onClick={() => setActiveComponent("add")}>Añadir Oferta</button>
                <button className="bg-blue text-white px-4 py-2 min-w-[10rem] rounded-full hover:bg-red transition w-full" onClick={() => setActiveComponent("edit")}>Editar Oferta</button>
                <button className="bg-blue text-white px-4 py-2 min-w-[10rem] rounded-full hover:bg-red transition w-full" onClick={() => setActiveComponent("delete")}>Eliminar Oferta</button>
            </div>
            
            <div style={{ marginTop: "20px" }}>
                {renderComponent()}
            </div>           
        </div>
        <Footer />
        </>
    );
}
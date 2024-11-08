import React from "react";
import Card from "../UI/CardContenidos";
import Navbar from "../UI/Navbar";
import Slider from "react-slick";
import Footer from "../UI/Footer";
import { useFetchContenidos } from "../../hooks/FetchContenidos"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Contenido = () => {
  const { contenidos, isLoading } = useFetchContenidos(); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: contenidos.length > 1 ? 2 : 1, 
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    autoplay: true, 
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="bg-white h-full w-full overflow-x-hidden">
      <Navbar />
      <Slider {...settings} className="px-4 mb-8">
        {contenidos.map((contenido) => (
          <Card 
            key={contenido.id} 
            title={contenido.titulo} 
            videoUrl={contenido.video_incrustado} 
          />
        ))}
      </Slider>
      <Footer/>
    </div>
  );
}

export default Contenido; 
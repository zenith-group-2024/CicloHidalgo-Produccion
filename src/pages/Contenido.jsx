import React from "react";
import Card from "../UI/CardContenidos";
import Navbar from "../UI/Navbar";
import Slider from "react-slick";
import Footer from "../UI/Footer";
import { useFetchContenidos } from "../../hooks/hooksContenido/FetchContenidos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

export const Contenido = () => {
  const { contenidos, isLoading } = useFetchContenidos();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: false,
        },
      },
    ],
  };

  if (isLoading) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navbar />
      <Slider {...settings} className="w-full flex justify-center items-center md:my-40 px-4 my-4 flex-grow">

        {contenidos.map((contenido) => (
          <Card
            key={contenido.id}
            title={contenido.titulo}
            videoUrl={contenido.video_incrustado}
          />
        ))}
      </Slider>
      <Footer />
    </div>
  );
};



const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className=" absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
    >
      <ChevronRight size={32} className="  text-old hover:text-black" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
    >
      <ChevronLeft size={32} className="2xl:visible  text-old hover:text-black" />
    </div>
  );
};

export default Contenido;

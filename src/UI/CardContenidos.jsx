import React from "react";

export const Card = (props) => {
  
  const convertToEmbedUrl = (url) => {
    return url.replace("watch?v=", "embed/");
  };

  const embedUrl = convertToEmbedUrl(props.videoUrl);

  return (
    <div className="w-11/12 mx-auto"> 
      <div className=" rounded-xl bg-white border-black w-full  ">
        <iframe
          src={embedUrl}
          className="w-full h-96  " 
          title={props.title}
          allowFullScreen
        ></iframe>
        <div className="bg-white p-4 my-4 rounded-xl shadow-lg">
          <h1 className="font-primary font-semibold text-xl text-black text-right sm:text-lg">
            {props.title}
          </h1>
        </div>
      </div>
    </div>
  );
  
};

export default Card;
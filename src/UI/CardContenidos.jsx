import React from "react";

export const Card = (props) => {
  
  const convertToEmbedUrl = (url) => {
    return url.replace("watch?v=", "embed/");
  };

  const embedUrl = convertToEmbedUrl(props.videoUrl);

 

  return (
    <div className="border-b-2 border-border-gray-opacity w-full mt-8 space-x-4 ">
      <div className="rounded-md bg-white border-black w-full mx-auto ">
        <iframe
          src={embedUrl}
          className="w-full h-96" 
          title={props.title}
          allowFullScreen
        ></iframe>
        <div className="bg-white p-4 mb-8 shadow-lg">
          <h1 className="font-primary font-semibold text-xl text-black text-right">
            {props.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import "./AdBanner.css";

const AdBanner = ({ image, text, link }) => {
  return (
    <div className="ad-banner">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={image} alt="Publicidad" className="ad-banner-image" />
      </a>
      {text && <p className="ad-banner-text">{text}</p>}
    </div>
  );
};

export default AdBanner;
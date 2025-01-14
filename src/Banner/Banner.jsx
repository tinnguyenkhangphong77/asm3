import React, { useState, useEffect } from "react";
import h1 from "./2.png";
import h2 from "./2.webp";
import h3 from "./3.jpg";
import h4 from "../Image/banner1.jpg";
import styles from "./Banner.module.css";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [h1, h2, h3, h4];

  useEffect(() => {
    //xử dụng setInterval để khi hết vòng lặp nó tiếp tực lặp
    //setTimeout hết vòng lặp sẽ dừng
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    // Hủy bỏ interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.image}>
      <img
        src={images[currentImageIndex]}
        alt={`hinh${currentImageIndex + 1}`}
      />
    </div>
  );
};

export default Banner;

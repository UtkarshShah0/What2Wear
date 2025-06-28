import { useState, useEffect } from "react";
import BoxComponent from "./BoxComponent";
import What2Wear from './What2Wear';

function SelectCategory() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showWhat2Wear, setShowWhat2Wear] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    fetch("https://what2wear-backend.vercel.app/user-images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showWhat2Wear]);


  useEffect(() => {
    if (isRotating) {
      setTimeout(() => {
        setShowWhat2Wear(false);
        setIsRotating(false);
      }, 1000);
    }
  }, [isRotating]);

  const handleClick = (text) => {
    // console.log("clicked");
    const filteredImages = images.filter(image => image.tags.includes(text));
    if (filteredImages.length > 0) {
      const randomImage = filteredImages[Math.floor(Math.random() * filteredImages.length)];
      setSelectedImage(randomImage);
      setShowWhat2Wear(true);
    } else {
      console.log('No images found for the selected tag');
    }
    // console.log(text);
  };

	return (
    <>
      {!showWhat2Wear ? (
        <div className="select-category">
          <div className="heading">
            <h3>Select Category</h3>
          </div>
          <div className="select-options">
            <BoxComponent image="./Office.png" text="OFFICE" onClick={() => handleClick("Office")} />
            <BoxComponent image="./College.png" text="COLLEGE" onClick={() => handleClick("College")} />
            <BoxComponent image="./Party.png" text="PARTY" onClick={() => handleClick("Party")} />
            <BoxComponent image="./Market.png" text="MARKET" onClick={() => handleClick("Market")} />
          </div>
        </div>
      ) : (
        <div className="recommendation">
          <What2Wear className="turn-and-grow" image={selectedImage} />
          <div className="btn-reload">
            {/* <img src="./refresh-arrow.png" alt="Reload" onClick={() => setShowWhat2Wear(false)} /> */}
            <img
              src="./refresh-arrow.png"
              alt="Reload"
              className={isRotating ? 'rotate' : ''}
              onClick={() => setIsRotating(true)}
            />
            </div>
        </div>
      )}
    </>
  );
}

export default SelectCategory;
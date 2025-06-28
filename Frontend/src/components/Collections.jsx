import { useEffect, useState } from "react";
import MiniImageCard from "./MiniImageCard";

function Collections() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://what2wear-backend.vercel.app/user-images")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Collections">
      {/* <MiniImageCard /> */}
      {images.map(
        (image, index) => (
          console.log(image.url),
          (
            <MiniImageCard
              key={index}
              url={image.url}
              description={image.description}
            />
          )
        )
      )}
    </div>
  );
}

export default Collections;

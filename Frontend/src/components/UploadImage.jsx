import { useState, useRef } from "react";
import ImageCard from "./ImageCard";

const tagOptions = ["Office", "College", "Party", "Market"];
const colorOptions = [
  "Black",
  "White",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Pink",
  "Purple",
  "Brown",
  "Beige",
];

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(tagOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [imageBase64, setImageBase64] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const formRef = useRef();
  // Function to convert image to base64 (from Form.js)
  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  // const handleImageChange = (event) => {
  //   setSelectedImage(URL.createObjectURL(event.target.files[0]));
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Set preview image
    setFileToBase64(file); // Convert to base64 for upload
  };

  const handleUpload = async () => {
    // Assuming you have an API endpoint for image upload
    const response = await fetch("https://what2wear-backend.vercel.app/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        tags: tag,
        colors: color,
        image: imageBase64,
      }),
      credentials: "include",
    });

    // ... handle response and potential errors
    // after successful upload
    setSelectedImage(null);
    setDescription('');
    setTag('');
    setColor('');
    setUserMessage('Image added successfully');
    formRef.current.reset();
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "description":
        setDescription(value);
        break;
      case "tag":
        setTag(value);
        break;
      case "color":
        setColor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="UploadImage">
      <form ref={formRef}>
      <div className="image-details">
        <div className="label-input">
          <label htmlFor="file">Upload Image</label>
          <input type="file" id="file" onChange={handleImageChange} />
        </div>
        <div className="label-input">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <div className="label-input">
          <label htmlFor="tag">Tag</label>
          <select id="tag" value={tag} onChange={handleInputChange}>
            {tagOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="label-input">
          <label htmlFor="color">Color</label>
          <select id="color" value={color} onChange={handleInputChange}>
            {colorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      </form>
      <div className="image-view">
        {selectedImage && (
          <ImageCard
            img={selectedImage}
            desc={description}
            tag={tag}
            color={color}
          />
        )}
        {userMessage && <p style={{color: 'black'}}>{userMessage}</p>}
      </div>
    </div>
  );
}

// function UploadImage() {
// 	const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     setSelectedImage(URL.createObjectURL(event.target.files[0]));
//   };

//   return (
// 		<div className="UploadImage">
// 			<div className="image-details">
// 				<div className="label-input">
// 					<label htmlFor="description">Description</label>
// 					<input type="text" id="description" />
// 				</div>
// 				<div className="label-input">
// 					<label htmlFor="tag">Tag</label>
// 					<input type="text" id="tag" />
// 				</div>
// 				<div className="label-input">
// 					<label htmlFor="color">Color</label>
// 					<input type="text" id="color" />
// 				</div>
// 				<div className="label-input">
// 					<label htmlFor="file">Upload Image</label>
// 					<input type="file" id="file" onChange={handleImageChange} />
// 					<button>Upload</button>
// 				</div>
// 			</div>
// 			<div className="image-view">
// 				{selectedImage && (
// 					<ImageCard
// 						img={selectedImage}
// 						desc={"Black Party Formals"}
// 						tag={"Formal"}
// 						color={"Black"}
// 					/>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

export default UploadImage;

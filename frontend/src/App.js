import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const createImg = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/create", {
        prompt,
      });
      setImage(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateImage = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/update", {
        imageUrl: imageURL,
      });
      setImage(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="form">
        <h1 style={{ textAlign: "center" }}>Virtual real estate nft project</h1>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter your image description"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={createImg}
          disabled={loading}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
        {imageURL && (
          <div style={{ textAlign: "center" }}>
            <img
              src={imageURL}
              alt="prompt"
              style={{ maxWidth: "700px", maxHeight: "700px", width: "100%" }}
            />
            <button
              className="btn btn-success"
              onClick={updateImage}
              style={{ marginTop: "10px" }}
            >
              Update Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

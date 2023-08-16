const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

// Your DALL-E API key
const apiKey = process.env.DALLE_API_KEY;

// DALL-E API endpoint
const apiUrl = "https://api.openai.com/v1/images";

// Text description for the image
const text = "A surreal landscape with floating islands in a pink sky";

// Make a request to DALL-E API
axios
  .post(
    apiUrl,
    {
      prompt: text,
      n: 1, // Number of images to generate
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  )
  .then((response) => {
    const imageUrl = response.data.data[0].url;
    console.log("Generated image URL:", imageUrl);
    // You can save or process the image URL as needed
  })
  .catch((error) => {
    console.error("Error:", error);
  });

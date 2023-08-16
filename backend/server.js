require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const { DALLE_API_KEY } = process.env;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/create", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    res.send(response.data.data[0].url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/update", async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const response = await openai.createImageEdit(
      fs.createReadStream(imageUrl), // Use the original image URL as the input image
      null, // You can omit the mask parameter if not needed
      "Add upgraded furniture to the living room.",
      1,
      "1024x1024"
    );
    res.send(response.data.data[0].url);
  } catch (err) {
    console.error("Error in updating image:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the image." });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

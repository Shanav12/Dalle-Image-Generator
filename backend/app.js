import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import mongoose from "mongoose";
import { config, uploader } from "cloudinary";
import cors from "cors";
import os from "os";



dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000 || process.env.PORT;

config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));


const openai = new OpenAI({apiKey: process.env.OPENAI_KEY});


mongoose
    .connect(process.env.MONGO_URL)
    .then((data) => {
    console.log("Connected succesfully");
    }).catch((e) => {
    console.log(e)
});

const imageSchema = new mongoose.Schema({
    prompt: String,
    url: String,
    public_id: String
    }, 
    {
        timestamps: true
    }
);
const Images = mongoose.model("Images", imageSchema);


app.post("/generate", async (req, res) => {
    const {prompt} = req.body;
    try {
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        });
        const image = await uploader.upload(
            imageResponse.data[0].url, {
                folder: "dallte-output"
        });
        const imageCreated = await Images.create({
            prompt: imageResponse.data[0].revised_prompt,
            url: image.url,
            public_id: image.public_id
        });
        res.json(imageCreated);
    } catch (error) {
        res.json({message: `Error gnerating image: ${error}`});
    }
});


app.get("/list", async (req, res) => {
    try {
        const images = await Images.find();
        res.json(images);
    } catch (error) {
        res.json({message: `Error sending message: ${error}`})
    }
});


app.listen(PORT, console.log(`Server is running on port: ${PORT}`));
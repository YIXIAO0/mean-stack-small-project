import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const cuisineTypeRouter = express.Router();
cuisineTypeRouter.use(express.json());

cuisineTypeRouter.get("/name/:name", async (req, res) => {
    const name = req.params.name;
    try {
        let cuisineType = await collections.cuisineTypes.findOne({ name: name });
        if (!cuisineType){
            // If not found, create a new cuisine type
            const result = await collections.cuisineTypes.insertOne({ name });
            cuisineType = { _id: result.insertedId, name: name};
        }
        res.status(200).send(cuisineType);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

cuisineTypeRouter.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const normalized = name.trim().toLowerCase();

        // Check if the cuisine type already exists in the database
        const existingCuisineType = await collections.cuisineTypes.findOne({ name: normalized });
        if (existingCuisineType) {
            return res.status(409).send("Cuisine type already exists");
        }

        // If it doesn't exist, insert the new cuisine type
        const result = await collections.cuisineTypes.insertOne({ name: normalized });
        if (result.acknowledged) {
            res.status(201).send({ _id: result.insertedId, name: normalized });
        } else {
            res.status(500).send("Failed to create a new cuisine type.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

cuisineTypeRouter.get("/", async (_req, res) => {
    try {
        const cuisineTypes = await collections.cuisineTypes.find({}).toArray();
        res.status(200).send(cuisineTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});









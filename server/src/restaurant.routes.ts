import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const restaurantRouter = express.Router();
restaurantRouter.use(express.json());

// Get all restaurants in the database
restaurantRouter.get("/", async (_req, res) => {
    try {
        const restaurants = await collections.restaurants.find({}).toArray();
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a single restaurant by ID
restaurantRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const restaurant = await collections.restaurants.findOne(query);

        if (restaurant) {
            res.status(200).send(restaurant);
        } else {
            res.status(400).send(`Failed to find a restaurant: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a restaurant: ID ${req?.params?.id}`);
    }
});

// Create a new restaurant
restaurantRouter.post("/", async (req, res) => {
    try {
        const restaurant = req.body;
        const result = await collections.restaurants.insertOne(restaurant);

        if (result.acknowledged) {
            res.status(201).send(`Created a new restaurant: ID ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to craete a new restaurant.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// Update an existing restaurant
restaurantRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const restaurant = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.restaurants.updateOne(query, { $set: restaurant });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a restaurant: ID${id}`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a restaurant: ID${id}`);
        } else {
            res.status(304).send(`Failed to update a restaurant: ID${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Delete an existing restaurant
restaurantRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.restaurants.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a restaurant: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an restaurant: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch(error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
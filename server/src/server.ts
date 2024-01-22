import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase, collections } from "./database";
import { restaurantRouter } from "./restaurant.routes";
import { cuisineTypeRouter } from "./cuisineType.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.log("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());

        app.use("/restaurants", restaurantRouter);
        app.use("/cuisineTypes", cuisineTypeRouter);

        app.get('/filteredRestaurants', async (req, res) => {
            try {
                const name = req.query.name;
                const minRating = req.query.minRating;
                const maxRating = req.query.maxRating;
        
                let query: any = {};
        
                if (name) {
                    query.name = { $regex: new RegExp(name as string, 'i') };
                }
                if (minRating) {
                    query.rating = { ...query.rating, $gte: parseFloat(minRating as string) };
                }
                if (maxRating) {
                    query.rating = { ...query.rating, $lte: parseFloat(maxRating as string) };
                }
        
                const restaurants = await collections.restaurants?.find(query).toArray();
                res.status(200).json(restaurants);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });        

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });
    })
    .catch(error => console.error(error));
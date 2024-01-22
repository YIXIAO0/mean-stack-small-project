import * as mongodb from "mongodb";
import {Restaurant} from "./restaurant";
import { CuisineType } from "./cuisineType";

export const collections: {
    restaurants?: mongodb.Collection<Restaurant>;
    cuisineTypes?: mongodb.Collection<CuisineType>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("Cluster0");
    await applySchemaValidation(db);

    const restaurantsCollection = db.collection<Restaurant>("restaurants");
    collections.restaurants = restaurantsCollection;

    const cuisineTypesCollection = db.collection<CuisineType>("cuisineTypes");
    collections.cuisineTypes = cuisineTypesCollection;
    
}

async function applySchemaValidation(db: mongodb.Db) {
    const restaurantJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "location", "cuisineType", "rating", "priceRange"],
            additionalProperties: false,
            properties: {
                _id: {},
                websiteURL: {
                    bsonType: "string",
                    description: "'websiteURL' is an optional string and should be a valid URL",
                    pattern: "^(http[s]?:\\/\\/)?([^\\/\\s]+\\/)(.*)$",
                },
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                location: {
                    bsonType: "string",
                    description: "'location' is required and is a string",
                },
                cuisineType: {
                    bsonType: "string",
                    description: "'cuisineType' is required and is a string"
                },    
                rating: {
                    bsonType: "double",
                    description: "'rating' is required and is a number",
                    minimum: 1, // Assuming the rating scale is 1-5
                    maximum: 5,
                },
                priceRange: {
                    bsonType: "string",
                    description: "'priceRange' is required and is a string",
                    enum: ["$", "$$", "$$$", "$$$$"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "restaurants",
        validator: restaurantJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("restaurants", {validator: restaurantJsonSchema});
        }
    });

}
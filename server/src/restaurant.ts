import * as mongodb from "mongodb";

export interface Restaurant {
    name: string;                                // The name of the restaurant
    location: string;                            // Physical address of the restaurant (within Los Angeles)
    cuisineType: string;                         // The type of cuisine (e.g. Chinese, Japanese, Italian)
    rating: number;                              // Rating based on my scale
    priceRange: "$" | "$$" | "$$$" | "$$$$";     // Price range ("$", "$$", "$$$", "$$$$")
    websiteURL?: string;                         // Optional website URL for the restaurant
    _id?: mongodb.ObjectId;
}
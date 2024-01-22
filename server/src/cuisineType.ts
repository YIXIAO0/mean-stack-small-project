import * as mongodb from "mongodb";

export interface CuisineType {
    __id?: mongodb.ObjectId;         
    name: string;               // The cuisine type for the restaurant
}
export interface Restaurant {
    name?: string;                                
    location?: string;                           
    cuisineType?: string;                       
    rating?: number;                              
    priceRange?: "$" | "$$" | "$$$" | "$$$$";     
    websiteURL?: string;  
    _id?: string;                       
}
import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getBestBuy: function(query) {
    return axios.get("/api/products", { params: { q: query } });
  }
};

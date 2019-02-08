const axios = require("axios");
const router = require("express").Router();

router.get("/products", (req, res) => {
  axios
    .get("https://api.bestbuy.com/v1/products((search=iphone))?apiKey=Xe11XlW47Ed3PSEniOCbEMQE&sort=salePrice.asc&show=color,salePrice,name,image&format=json", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
const axios = require("axios");
const router = require("express").Router();

router.post("/products", (req, res) => {
  const {q}=req.body.params;
  console.log(req.body);
  axios
    .get(`https://api.bestbuy.com/v1/products((search=${q}))?apiKey=Xe11XlW47Ed3PSEniOCbEMQE&sort=salePrice.asc&show=color,salePrice,name,image&format=json`, { params: req.query })
    .then(resp => {
      console.log(resp.data.products);
      res.json(resp.data.products)})
    .catch(err => res.status(422).json(err));
});

module.exports = router;
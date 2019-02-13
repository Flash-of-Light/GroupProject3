const router = require("express").Router();
const cartRoutes = require("./cart");

// Cart routes
router.use("/cart", cartRoutes);

module.exports = router;
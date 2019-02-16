const router = require("express").Router();
const apiRoutes = require("./api");
// const cartRoutes = require("./cart");

router.use("/api", apiRoutes);
// router.use("/cart", cartRoutes);

module.exports = router;

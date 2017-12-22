const express = require("express");
const router = express.Router();

const homeRoutes = require("./home");
const authRoutes = require("./auth");
const poemRoutes = require("./poem");

router.use("/", homeRoutes);
router.use("/", authRoutes);
router.use("/poem", poemRoutes);

module.exports = router;
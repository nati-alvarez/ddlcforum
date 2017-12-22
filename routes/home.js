const express = require("express");
const router = express.Router();

const controller = require("../controllers/home");

router.get("/", controller.index);
router.get("/forum", controller.forum);

module.exports = router;
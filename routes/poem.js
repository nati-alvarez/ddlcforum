const express = require("express");
const router = express.Router();

const controller = require("../controllers/poem");

router.post("/", controller.createPoem);
router.get("/new", controller.newPoem);
router.post("/new", controller.createPoem);
router.get("/:id", controller.getPoem);

module.exports = router;
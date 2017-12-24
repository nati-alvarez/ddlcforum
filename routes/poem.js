const express = require("express");
const router = express.Router();

const controller = require("../controllers/poem");

router.post("/", controller.createPoem);
router.get("/new", controller.newPoem);
router.post("/new", controller.createPoem);
router.get("/:id", controller.getPoem);
router.post("/:id", controller.createComment);
router.get("/:id/like", controller.likePoem);
router.get("/:id/dislike", controller.dislikePoem);

module.exports = router;
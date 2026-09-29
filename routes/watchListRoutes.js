const express = require("express");
const {
  addToWatchList,
  getWatchList,
} = require("../controlers/watchlistContoller");
const authMiddleware = require("../middleware/authMidddleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getWatchList);
router.post("/", addToWatchList);
// router.delete("/:id");
// router.post("/logout", logout);

module.exports = router;

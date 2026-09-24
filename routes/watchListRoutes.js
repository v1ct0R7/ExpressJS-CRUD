const express = require("express");
const addToWatchList = require("../controlers/watchlistContoller");
const authMiddleware = require('../middleware/authMidddleware')

const router = express.Router();

router.use(authMiddleware);
router.post("/", addToWatchList);
// router.post("/login", login);
// router.post("/logout", logout);




module.exports = router;

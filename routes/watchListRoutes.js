const express = require("express");
const { addToWatchList} = require("../controlers/watchlistContoller");


const router = express.Router();

router.post("/", addToWatchList);
router.post("/login", login);
router.post("/logout", logout);




module.exports = router;

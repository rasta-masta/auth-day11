const router = require("express").Router();
const { tweetController } = require("../controllers");
const { verifyToken  } = require("../middleware/auth");

router.post("/", verifyToken, tweetController.posting);
router.get("/", tweetController.getAllTweet);
router.get("/:id", tweetController.getTweetById);
router.delete("/:id", tweetController.deleteTweet);

module.exports = router;


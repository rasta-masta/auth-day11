const router = require("express").Router();
const { tweetController } = require("../controller");

router.post("/", tweetController.tweet);
router.get("/", tweetController.getAllTweet);
// router.get("/", tweetController.getTweetByTime),
router.get("/:UserId", tweetController.getUserTweet);

module.exports = router;

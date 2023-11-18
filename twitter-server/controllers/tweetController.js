const db = require("../models");
const Tweet = db.Tweet;
const User = db.User;

module.exports = {
  posting: async(req, res) => {
    const {UserId, username, email, tweet} = req.body
    try {
      await Tweet.create({
        UserId,
        username,
        email,
        tweet,
      });
      res.status(200).json(`TWEET POSTED..!!`)
    } catch (error) {
      console.log(error)
      res.status(500).send({result,  msg: 'INTERNAL SERVER ERROR..!!'})
    }
  },
  getAllTweet: async(req, res) => {
    try {
      const result = await Tweet.findAll({
        order:[["UserId", "DESC"]],
        include: [{
          model: User,
          attributes: ["username", "email"]
        }]
      });
      // console.log(result);
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(400).send({ msg : error.message })
    }
  },
  getTweetById: async(req, res) => {
    try {
      const result = await Tweet.findAndCountAll({
        include: [{
          model: User,
          attributes: ["username", "email"],
          where: {
            id: req.params.id
          }
        }]
      });
      res.status(200).send(result)
    } catch (error) {
      console.log(error);
      res.status(400).send({ message : error.message });
    }
  },
  deleteTweet: async(req, res) => {
    try {
      await Tweet.destroy({ 
        where: {
          id: req.params.id
        }
      })
      res.status(200).send("TWEET DELETED..!!")
    }catch (err) {
      console.log(err)
      res.status(400).send({ msg : err.message })
    }
  } 
}

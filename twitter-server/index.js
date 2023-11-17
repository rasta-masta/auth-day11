const express = require("express");
const PORT = 2000;
const db = require("./models");
const cors = require("cors")
const { userRouter, tweetRouter } = require('./routers')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", (req, res) => {
   res.send("This is my API");
});

app.use('/users', userRouter)
app.use('/tweets', tweetRouter)

app.listen(PORT, () => {
  //  db.sequelize.sync({ alter: true });
   console.log(`listening on ${PORT}`);
});

const express = require("express");
const PORT = 2000;
const db = require("./models");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/", (req, res) => {
   res.send("This is my API");
});

const { userRouter, tweetRouter } = require("./routers");
app.use("/users", userRouter);
app.use("/tweets", tweetRouter);

app.listen(PORT, () => {
   //  db.sequelize.sync({ alter: true });
   console.log(`listening on ${PORT}`);
});

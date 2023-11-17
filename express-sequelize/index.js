const express = require("express");
const PORT = 2000;
const db = require("./models");

const app = express(express);

app.use(express.json());

app.get("/api/", (req, res) => {
   res.send("This is my API");
});

const { userRouter, tweetRouter } = require("./routers");
app.use("/users", userRouter);
app.use("/tweet", tweetRouter);

app.listen(PORT, () => {
   //    db.sequelize.sync({ force: true });
   console.log(`server running on port ${PORT}`);
});

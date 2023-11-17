const db = require("../models");
const User = db.User;

module.exports = {
   register: async (req, res) => {
      try {
         const { username, email, password } = req.body;
         await User.create(req.body);
         res.status(200).send("Register success");
      } catch (error) {
         console.log(error);
      }
   },
   getAll: async (req, res) => {
      try {
         const result = await User.findAll();
         res.status(200).send({ data: result });
      } catch (error) {
         console.log(error);
      }
   },
   getById: async (req, res) => {
      try {
         const result = await User.findOne({
            attributes: {
               exclude: ["password"],
            },
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send({ data: result });
      } catch (error) {
         console.log(error);
      }
   },
   deleteById: async (req, res) => {
      try {
         const result = await User.destroy({
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send({ data: result });
      } catch (error) {
         console.log(error);
      }
   },
   editById: async (req, res) => {
      try {
         const result = await User.update({
            where: {
               id: req.params.id,
            },
         });
         res.status(200).send({ data: result });
      } catch (error) {
         console.log(error);
      }
   },
};

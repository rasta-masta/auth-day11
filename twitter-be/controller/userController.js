const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
   register: async (req, res) => {
      try {
         const { username, email, password } = req.body;
         const isEmailExist = await User.findOne({
            where: {
               email,
            },
         });

         if (isEmailExist) {
            res.status(409).send({ message: "Email already exists" });
         }
         const salt = await bcrypt.genSalt(10);
         const hasPassword = await bcrypt.hash(password, salt);

         await User.create({ username, email, password: hasPassword });
         res.status(200).send({ message: "Success" });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   getAll: async (req, res) => {
      try {
         const result = await User.findAll();
         res.status(200).send({ result });
      } catch (error) {
         console.log(error);
      }
   },
   login: async (req, res) => {
      try {
         const { email, password } = req.query;
         const isUserExist = await User.findOne({
            where: {
               email,
            },
         });
         if (!isUserExist) {
            return res.status(404).send({ message: "User not found" });
         }

         const isValid = await bcrypt.compare(password, isUserExist.password);
         if (!isValid) {
            return res.status(404).send({ message: "Incorect Password" });
         }
         const payload = { id: isUserExist.id };
         const token = jwt.sign(payload, "TWITTER", { expiresIn: "5h" });
         res.status(200).send({
            message: "Login Success",
            result: isUserExist,
            token,
         });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   keepLogin: async (req, res) => {
      try {
         const result = await User.findOne({
            where: {
               id: req.user.id,
            },
         });
         res.status(200).send({ result });
      } catch (error) {
         res.status(400).send({ message: error.message });
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
         res.status(200).send({ result });
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
         res.status(200).send({ result });
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
         res.status(200).send({ result });
      } catch (error) {
         console.log(error);
      }
   },
};

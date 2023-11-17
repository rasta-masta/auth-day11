const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
   register: async (req, res) => {
      try {
         const { username, email, password, isAdmin } = req.body;
         const isEmailExist = await User.findOne({
            where: {
               email,
            },
         });

         if (isEmailExist) {
            res.status(409).send({ message: "EMAIL ALREADY EXIST..!!" });
         }
         const salt = await bcrypt.genSalt(10);
         const hasPassword = await bcrypt.hash(password, salt);

         await User.create({ 
          username, 
          email, 
          password: hasPassword, 
          isAdmin });
         res.status(200).send({ message: "SUCCEDD..!!" });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   getAll: async (req, res) => {
      try {
         const result = await User.findAll({
          attributes:["id", "username", "email", "isAdmin" ]
         });
         res.status(200).send({ result });
        //  console.log(result)
      } catch (error) {
         res.status(401).send({ message: error.message });
      }
   },
   login: async (req, res) => {
      try {
         const { email, password } = req.body;
         const isUserExist = await User.findOne({
            where: {
               email,
            },
            attributes:["id", "username", "email", "isAdmin", "password"]
         });
         if (!isUserExist) {
            return res.status(404).send({ message: "USER NOT FOUND..!!" });
         }

         const isValid = await bcrypt.compare(password, isUserExist.password);
         if (!isValid) {
            return res.status(404).send({ message: "INCORRECT PASSWORD..!!" });
         }
         const payload = { id: isUserExist.id, isAdmin: isUserExist.isAdmin };
         const token = jwt.sign(payload, "JCWD0208", { expiresIn: "1h" });
         res.status(200).send({
            message: "LOGIN SUCCESSFULLY..!!",
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
   edit: async (req, res) => {
      try {
         console.log(req.user);
         const result = await User.update(req.body, {
            where: {
               id: req.user.id,
            },
         });
         res.status(200).send({ message: "EDITED..!!" });
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   editPassword: async (req, res) => {
      try {
         const { password } = req.body;
         const salt = await bcrypt.genSalt(10);
         const hasPassword = await bcrypt.hash(password, salt);
         await User.update(
            { password: hasPassword },
            {
               where: {
                  id: req.user.id,
               },
            }
         );
         res.status(200).send({ message: "PASSWORD EDITED SUCCESSFULLY..!!"});
      } catch (error) {
         res.status(400).send({ message: error.message });
      }
   },
   
};

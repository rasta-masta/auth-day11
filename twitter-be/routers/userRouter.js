const router = require("express").Router();
const { userController } = require("../controller");
const { verifyToken } = require("../middleware/auth");
router.post("/", userController.register);
router.get("/", userController.getAll);
router.get("/keeplogin", verifyToken, userController.keepLogin);
router.get("/login", userController.login);
router.get("/:id", userController.getById);
router.patch("/:id", userController.editById);
router.delete("/:id", userController.deleteById);

module.exports = router;

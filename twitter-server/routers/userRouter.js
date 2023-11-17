const router = require("express").Router();
const { userController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");

router.get("/", verifyToken, checkRole, userController.getAll);
router.get("/keeplogin", verifyToken, userController.keepLogin);
router.post("/login", userController.login);
router.post("/", userController.register);
router.patch("/", verifyToken, userController.edit);
router.patch("/update-password", verifyToken, userController.editPassword);

module.exports = router;

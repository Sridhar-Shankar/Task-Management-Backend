const router = require("express").Router();
const UserController = require("../controllers/AuthController");

// Define routes and link them to the controller methods
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.patch("/updateuser/:id", UserController.updateUser);

// Export the router
module.exports = router;

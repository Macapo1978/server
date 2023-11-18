const router = require("express").Router();
const userController = require("../controllers/user-controller");

console.log("estoy en user router")
router
    .route('/api/users')
    .post(userController.createUser)
    .get(userController.getAllUsers);

router
    .route('/api/users/:id')
    .get(userController.getUserById)
    .put(userController.updateUsers)
    .delete(userController.deleteUser);

module.exports = router;
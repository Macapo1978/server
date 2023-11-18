const router = require("express").Router();
const userController = require("../controllers/user-controller");

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
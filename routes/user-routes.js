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

router
    .route('/api/usersName/:userName')
    .get(userController.getUserByUserName);

module.exports = router;
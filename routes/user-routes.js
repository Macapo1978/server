const router = require("express").Router();
const userController = require("../controllers/user-controller");

router
    .route('/api/users')
    .get(userController.getAllUsers);

router
    .route('/api/users/:id')
    .get(userController.getUserById)
    .put(userController.updateUsers)
    .delete(userController.deleteUser);

router
    .route('/api/usersName/:userName')
    .get(userController.getUserByUserName);

router
    .route('api/register')
    .post(userController.createUser);  

router
    .route('/api/login')    
    .post(userController.loginUser);

router
    .route('/api/current')    
    .get(userController.currentAuth);

module.exports = router;
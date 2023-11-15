const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

router
    .route('/api/categories')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories);

router
    .route('/api/categories/:id')
    .get(categoryController.getCategoryById)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;
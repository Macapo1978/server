const knex = require('knex')(require('../knexfile'));

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await knex('categories').where('id', categoryId).first();
    if (!category) {
      return res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: `Error getting category: ${error}` });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await knex('categories');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: `Error getting categories: ${error}` });
  }
};

const createCategory = async (req, res) => {
  const { description } = req.body;

  try {
    const [categoryId] = await knex('categories').insert({ description });
    const newCategory = await knex('categories').where('id', categoryId).first();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: `Error creating category: ${error}` });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { description } = req.body;

  try {
    const updatedRows = await knex('categories').where('id', categoryId).update({ description });
    if (updatedRows === 0) {
      return res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
    }
    const updatedCategory = await knex('categories').where('id', categoryId).first();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: `Error updating category: ${error}` });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedRows = await knex('categories').where('id', categoryId).del();
    if (deletedRows === 0) {
      return res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `Error deleting category: ${error}` });
  }
};

module.exports = {
  getCategoryById,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

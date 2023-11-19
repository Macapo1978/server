const knex = require('knex')(require('../knexfile'));

const createUser = async (req, res) => {
    const {
        user_name,
        email,
        password,
        native_language_id,
        profile_id
    } = req.body;

    if (!user_name || !email || !password || !native_language_id || !profile_id) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
    }
    try {
        const [newUserId] = await knex('users').insert({
            user_name,
            email,
            password,
            native_language_id,
            profile_id    
        });

        const newUser = await knex('users').where('id', newUserId).first();
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: `Error creating user: ${error}`});
    }
};

const updateUsers = async (req, res) => {
    const { id } = req.params;
    const {
        user_name,
        email,
        password,
        native_language_id,
        profile_id
    } = req.body;
    try {
      const updatedRows = await knex('users')
        .where('id', id)
        .update({ 
            user_name,
            email,
            password,
            native_language_id,
            profile_id 
        });
  
      if (updatedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updatedUser = await knex('users').where('id', id).first();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: `Error updating users: ${error}` });
    }
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await knex('users').where('id', id).del();
  
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: `Error deleting user: ${error}` });
    }
  };

  const getAllUsers = async (req, res) => {

    try {
        const users = await knex('users')
            .select('users.*', 'languages.description as native_language', 'profiles.description as profile')
            .leftJoin('languages', 'users.native_language_id', 'languages.id')
            .leftJoin('profiles', 'users.profile_id', 'profiles.id');
  
        res.json(users);

    } catch (error) {
      res.status(500).json({ error: `Error getting users: ${error}` });
    }
  };

  const getUserById = async (req, res) => {

    try {
        const user = await knex('users')
            .select('users.*', 'languages.description as native_language', 'profiles.description as profile')
            .leftJoin('languages', 'users.native_language_id', 'languages.id')
            .leftJoin('profiles', 'users.profile_id', 'profiles.id')
            .where('users.id', req.params.id)
            .first();
  
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found.`
        });
        }
        res.json(user);

    } catch (error) {
      res.status(500).json({ error: `Error getting user with id: ${req.params.id} error ${error}` });
    }
  };

  const getUserByUserName = async (req, res) => {

    try {
    
        const user = await knex('users')
            .select('users.*', 'languages.description as native_language', 'profiles.description as profile')
            .leftJoin('languages', 'users.native_language_id', 'languages.id')
            .leftJoin('profiles', 'users.profile_id', 'profiles.id')
            .where('users.user_name', req.params.userName)
            .first();
  
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${req.params.userName} not found.`
        });
        }
        res.json(user);

    } catch (error) {
      res.status(500).json({ error: `Error getting user with id: ${req.params.userName} error ${error}` });
    }
  };
module.exports = {
    createUser,
    updateUsers,
    deleteUser,
    getUserById,
    getAllUsers,
    getUserByUserName
}
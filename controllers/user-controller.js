const knex = require('knex')(require('../knexfile'));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    const {
        user_name,
        email,
        password,
        native_language_id,
        profile_id,
        name,
        last_name
    } = req.body;

    if (!user_name || !email || !password || !native_language_id || !profile_id || !name || !last_name) {
        return res.status(400).send('All fields are required.');
      }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format.');
    }

    const hashedPassword = bcrypt.hashSync(password);
    const newUser = {
      user_name,
      email,
      password: hashedPassword,
      native_language_id,
      profile_id,
      name,
      last_name
    }

    try {
        //validate email
        const lowerEmail = email.toLowerCase().trim();
        const existingEmail = await knex('users')
        .where('email', lowerEmail)
        .first();

        if(existingEmail){
          res.status(400).send('Exists an user with this email.');
          return;
        }

        const [newUserId] = await knex('users').insert({
            user_name,
            email: lowerEmail,
            password,
            native_language_id,
            profile_id,
            name,
            last_name
        });

        const newUser = await knex('users').where('id', newUserId).first();
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).send('Failed registration.');
    }
};

const loginUser = async(req, res) => {
  const { email, password} = req.body;

  if (!email || !password){
    return res.status(400).send("Please enter the required fields.")
  }

  try{
    //validate email
    const lowerEmail = email.toLowerCase().trim();
    const user = await knex('users')
    .where('email', lowerEmail)
    .first();

    if(!user){
      res.status(400).send('Invalid email.');
      return;
    }
    // validate password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid password");
    }
    // Generate a token
    const token = jwt.sign(
      { id: "user.id", email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({token});
    } catch(error){
      res.status(500).json({error: `Error in login: ${error}`});
    }
};

const currentAuth = async(req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
   // Parse the bearer token
   const authHeader = req.headers.authorization;
   const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    // Respond with the appropriate user data
    const user = users.find((indUser) => indUser.email === decoded.email);
    delete user.password;
    res.json(user);
  } catch (error) {
    return res.status(401).send("Invalid auth token");
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
    getUserByUserName,
    loginUser,
    currentAuth
}
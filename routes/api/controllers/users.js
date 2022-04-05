const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const User = require('../../../models/User');


const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
      // Check for existing user
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ error: { msg: 'User already exists' } });
      }

      user = new User({
        name,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

module.exports = {
    registerUser
}
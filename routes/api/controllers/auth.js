const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');


const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for existing user
        let user = await User.findOne({ email });

        if (!user) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Decrypt password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Create and send token
        const payload = {user: { id: user.id }};

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 },
        (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });

    } catch (err) {
        return res.status(500).send('Server Error');
}
}

module.exports = {
    getUser,
    loginUser
}
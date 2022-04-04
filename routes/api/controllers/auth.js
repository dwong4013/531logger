const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');


const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      return res.json(user);
    } catch (err) {
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

        try {
            let token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000 })
            return res.json({ token });
            
        } catch (error) {
            return res.status(500).send('Server Error');
        }

    } catch (err) {
        return res.status(500).send('Server Error');
    }   
}

module.exports = {
    getUser,
    loginUser,
}
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
        console.log('found user');

        if (!user) {
            console.log('user not found')
        return res
            .status(400)
            .json({ error: { msg: 'Invalid Credentials' } });
        }

        // Decrypt password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('password matching: ', isMatch)

        if (!isMatch) {
            console.log('password not matched')
        return res
            .status(400)
            .json({ error: { msg: 'Invalid Credentials' } });
        }

        // Create and send token
        const payload = {user: { id: user.id }};

        try {
            let token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000 })
            console.log(token)
            return res.send(token);
            
        } catch (error) {
            console.log('nested error: ', error)
            return res
            .status(500)
            .json({ error: { msg: 'Servor Error' } });
        }

    } catch (err) {
        console.log('error: ', err)
        return res
        .status(500)
        .json({ error: { msg: 'Servor Error' } });
}   
}

module.exports = {
    getUser,
    loginUser,
}
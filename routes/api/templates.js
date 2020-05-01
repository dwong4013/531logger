const express = require('express');
const router = express.Router();

// @route GET api/templates
// @desc Test route
// @access public

router.get('/', (req, res) => res.send('Templaes Route'));

module.exports = router;

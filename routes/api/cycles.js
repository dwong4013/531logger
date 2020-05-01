const express = require('express');
const router = express.Router();

// @route GET api/cycles
// @desc Test route
// @access public

router.get('/', (req, res) => res.send('Cycles Route'));

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Max = require('../../models/Max');

// @route   POST api/maxes
// @desc    Create Maxes
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('squat', 'Name is required').not().isEmpty(),
      check('bench', 'Name is required').not().isEmpty(),
      check('deadlift', 'Name is required').not().isEmpty(),
      check('press', 'Name is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    // Check input fields for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { squat, bench, deadlift, press } = req.body;

    try {
      const maxes = new Max({
        user: req.user.id,
        squat,
        bench,
        deadlift,
        press
      });

      await maxes.save();

      return res.json(maxes);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
);

// @route   Get api/maxes
// @desc    Get maxes
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const maxes = await Max.find({ user: req.user.id }).populate('user', [
      'name'
    ]);
    return res.json(maxes);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   DELETE api/maxes
// @desc    Delete a max record based on id
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    await Max.findOneAndDelete({ _id: req.params.id });
    return res.json({ msg: 'Max Deleted' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;

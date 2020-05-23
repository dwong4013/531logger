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
      check('squat', 'Squat is required').not().isEmpty(),
      check('bench', 'Bench is required').not().isEmpty(),
      check('deadlift', 'Deadlift is required').not().isEmpty(),
      check('press', 'Press is required').not().isEmpty()
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
// @desc    Get all maxes
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const maxes = await Max.find({ user: req.user.id })
      .populate('user', ['name'])
      .sort({ date: 'desc' });
    return res.json(maxes);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   Get api/max
// @desc    Get all maxes
// @access  Private

router.get('/:max_id', auth, async (req, res) => {
  try {
    const max = await Max.findOne({
      user: req.user.id,
      _id: req.params.max_id
    }).populate('user', ['name']);

    return res.json(max);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Maxes not found' });
    }
    return res.status(500).send('Server Error');
  }
});

// @route   DELETE api/maxes
// @desc    Delete a max record based on id
// @access  Private

router.delete('/:max_id', auth, async (req, res) => {
  try {
    const max = await Max.findOne({
      user: req.user.id,
      _id: req.params.max_id
    });

    if (!max) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to delete this record' });
    }

    await Max.findOneAndDelete({ user: req.user.id, _id: req.params.max_id });

    return res.json({ msg: 'Max Deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Maxes not found' });
    }

    return res.status(500).send('Server Error');
  }
});

module.exports = router;

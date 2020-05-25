const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Template = require('../../models/Template');
const Cycle = require('../../models/Cycle');

// @route   GET api/cycles
// @desc    Get cycles by user
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const cycles = await Cycle.find({
      user: req.user.id
    });

    if (!cycles) {
      return res
        .status(400)
        .json({ msg: 'There are no templates, please create one' });
    }
    return res.json(cycles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/cycle/:cycle_id
// @desc    Get cycle by user and id
// @access  Private

router.get('/:cycle_id', auth, async (req, res) => {
  try {
    const cycle = await Template.findOne({
      _id: req.params.cycle_id,
      user: req.user.id
    });

    if (!cycle) {
      return res
        .status(400)
        .json({ msg: 'There are no templates, please create one' });
    }
    return res.json(cycle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cycles
// @desc    Create a cycle
// @access  Private

router.post('/', auth, async (req, res) => {
  const { main, volume, week5s, week3s, week531, push, pull } = req.body;

  // Build template object
  const cycleFields = {
    user: req.user.id,
    main,
    volume,
    week5s,
    week3s,
    week531
  };

  try {
    const cycle = new Cycle(cycleFields);
    await cycle.save();
    return res.json(cycle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

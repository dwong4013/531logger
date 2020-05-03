const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const WorkingSet = require('../../models/WorkingSet');

// @route   GET api/workingsets
// @desc    Get all working set records
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const workingSets = await WorkingSet.find();

    if (!workingSets) {
      return res
        .status(400)
        .json({ msg: 'There are no working set templates, please create one' });
    }
    return res.json(workingSets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/workingsets/:set_id
// @desc    Get working set record by id
// @access  Private

router.get('/:set_id', auth, async (req, res) => {
  try {
    const workingSet = await WorkingSet.findById(req.params.set_id);

    if (!workingSet) {
      return res
        .status(400)
        .json({ msg: 'There are no working set templates, please create one' });
    }
    return res.json(workingSet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/workingsets
// @desc    Create a working set template
// @access  Private

router.post('/', auth, async (req, res) => {
  // Build template object
  let workingSetFields = {};
  workingSetFields = { ...req.body };

  try {
    const workingSet = new WorkingSet(workingSetFields);
    await workingSet.save();
    return res.json(workingSet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

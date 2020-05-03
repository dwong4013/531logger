const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Template = require('../../models/Template');

// @route   GET api/templates
// @desc    Get all templates by user
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const templates = await Template.find({
      user: req.user.id
    });

    if (!templates) {
      return res
        .status(400)
        .json({ msg: 'There are no templates, please create one' });
    }
    return res.json(templates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/templates
// @desc    Get all templates by user and id
// @access  Private

router.get('/:template_id', auth, async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.template_id,
      user: req.user.id
    });

    if (!template) {
      return res
        .status(400)
        .json({ msg: 'There are no templates, please create one' });
    }
    return res.json(template);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/templates
// @desc    Create a template
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('trainingMax', 'Please enter a Training Max').not().isEmpty(),
      check('name', 'Please enter a name for this template').not().isEmpty(),
      check('push', 'Please enter reps for push assistance').not().isEmpty(),
      check('pull', 'Please enter reps for pull assistance').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, trainingMax, volumeSets, push, pull } = req.body;

    // Build template object
    const templateFields = {
      user: req.user.id,
      name,
      trainingMax,
      volumeSets
    };

    // Build accessories object
    const accessoryRepFields = { push, pull };
    templateFields.accessoryReps = accessoryRepFields;

    try {
      const template = new Template(templateFields);
      await template.save();
      return res.json(template);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

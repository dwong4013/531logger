const { validationResult } = require('express-validator');

const WorkingSet = require('../../../models/WorkingSet');
const Template = require('../../../models/Template');
const Cycle = require('../../../models/Cycle');
const Max = require('../../../models/Max');
const User = require('../../../models/User');

const getCycles = async (req, res) => {
    try {
      const cycles = await Cycle.find({
        user: req.user.id
      }).sort({ date: 'desc' });
  
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
}

const getCycleById = async (req, res) => {
    try {
        const cycle = await Cycle.findOne({
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
}

const createCycle = async (req, res) => {

    const { squat, bench, deadlift, press } = req.body;

    const newCycle = {
      user: req.user.id,
      maxes: {
        squat,
        bench,
        deadlift,
        press
      }
    }

    try {
      const cycle = new Cycle(newCycle);
      await cycle.save();
      return res.status(200).json({
        msg: 'A new cycle has been created!'
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const editCycle = async (req, res) => {
    const { cycle_id, week, workout, set_type, set } = req.body;
  
    try {
      const cycle = await Cycle.findById({
        _id: cycle_id,
        user: req.user.id
      });
  
      if (set_type === 'accessoryReps') {
        cycle[week][workout][set_type].completed = !cycle[week][workout][set_type]
          .completed;
      } else {
        cycle[week][workout][set_type][set].completed = !cycle[week][workout][
          set_type
        ][set].completed;
      }
  
      await cycle.save();
  
      const cycles = await Cycle.find({
        user: req.user.id
      }).sort({ date: 'desc' });
  
      return res.json(cycles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const deleteCycle = async (req, res) => {
    try {
      const cycle = await Cycle.findById({
        _id: req.params.cycle_id
      });
  
      if (!req.params.cycle_id.match(/^[0-9a-fA-F]{24}$/) || !cycle) {
        return res.status(404).json({ msg: 'Cycle not found' });
      }
  
      await cycle.remove();
  
      res.json({ msg: 'Cycle removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

module.exports = {
    getCycles,
    getCycleById,
    createCycle,
    editCycle,
    deleteCycle
}
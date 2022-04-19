const Cycle = require('../../../models/Cycle');

const getCycles = async (req, res) => {
    try {
      const cycles = await Cycle.find({
        user: req.user.id
      })
      .populate('workoutsToDo', 'exercise week')
      .sort({ dateCreated: 'desc' });
  
      if (cycles.length === 0) {
        return res
          .status(400)
          .json({error: { msg: 'Please create a cycle to begin' }});
      }
      return res.json(cycles);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({error: {msg:'Server Error'}});
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
        msg: 'A new cycle has been created!',
        cycle
      });
    } catch (err) {
      return res.status(500).json({error: {msg:'Server Error'}});
    }
}

const editCycle = async (req, res) => {
  const { cycle_id } = req.params;
  const { key, values } = req.body;

  try {
    const cycle = await Cycle.findById({
      _id: cycle_id,
      user: req.user.id
    });

    cycle[key] = values;

    await cycle.save();

    return res.json(cycle);
  } catch (err) {
    if (err.kind && err.kind === undefined) {
      return res.status(400).json({error: { msg: 'Invalid cycle.'}})
    }

    return res.status(500).json({error: { msg:'Server Error'}});
  }
}

const deleteCycle = async (req, res) => {
    try {
      const cycle = await Cycle.findById({
        _id: req.params.cycle_id
      });

      if (!cycle) {
        return res
        .status(400)
        .json({error: { msg: 'Invalid cycle.'}})
      }
  
      await cycle.remove();
  
      res.status(200).json({ msg: 'Cycle has been removed' });
    } catch (err) {
      if (err.kind && err.kind === undefined) {
        return res.status(400).json({error: {msg: 'Invalid cycle.'}})
      }

      return res.status(500).send('Server Error');
    }
}

module.exports = {
    getCycles,
    createCycle,
    editCycle,
    deleteCycle
}
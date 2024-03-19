const { Thought, User } = require("../models");
const { rawListeners } = require("../models/Thought");

module.exports = {
  // Get thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).select(
        "-__v"
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //Thought creation
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
        message: "Thought created, but found no user with that ID",
        });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}
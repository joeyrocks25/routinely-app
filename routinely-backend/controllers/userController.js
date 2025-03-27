const UserModal = require('../models/userModel');

const getUserById = async (req, res) => {
  try {
    const user = await UserModal.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addGoalToUser = async (req, res) => {
  try {
    const userId = req.userId;
    const progress = 0;
    const { specific, measurableContext, measurableValue, measurableUnit, achievable, relevant, timebound } = req.body;

    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newGoal = {
      specific,
      measurableContext,
      measurableValue,
      measurableUnit,
      achievable,
      relevant,
      timebound,
      progress,
    };

    user.goals.push(newGoal);
    await user.save();

    const addedGoal = user.goals[user.goals.length - 1];

    res.status(201).json({ message: 'Goal added successfully', goal: addedGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateGoal = async (req, res) => {
  try {
    const userId = req.userId;
    const goalId = req.params.goalId;

    const { specific, measurableContext, measurableValue, measurableUnit, achievable, relevant, timebound, progress } = req.body;

    const user = await UserModal.findOneAndUpdate(
      { _id: userId, "goals._id": goalId },
      {
        $set: {
          "goals.$.specific": specific,
          "goals.$.measurableContext": measurableContext,
          "goals.$.measurableValue": measurableValue,
          "goals.$.measurableUnit": measurableUnit,
          "goals.$.achievable": achievable,
          "goals.$.relevant": relevant,
          "goals.$.timebound": timebound,
          "goals.$.progress": progress

        }
      },
      { new: true, runValidators: true, projection: { goals: { $elemMatch: { _id: goalId } } } }
    );

    if (!user || !user.goals.length) {
      return res.status(404).json({ error: "User or Goal not found" });
    }

    res.status(200).json({ message: "Goal updated successfully", goal: user.goals[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteGoalById = async (req, res) => {
  try {
    const userId = req.userId;
    const goalId = req.params.goalId;

    const user = await UserModal.updateOne(
      { _id: userId, "goals._id": goalId },
      { $pull: { goals: { _id: goalId } } }
    );

    if (user.modifiedCount === 0) {
      return res.status(404).json({ error: "User or Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModal.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getUserById,
  addGoalToUser,
  deleteUser,
  updateGoal,
  deleteGoalById,
};

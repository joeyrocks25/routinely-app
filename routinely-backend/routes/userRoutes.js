const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { getUserById, addGoalToUser, deleteUser, updateGoal, deleteGoalById } = require('../controllers/userController');

const router = express.Router();

// user routes
router.get('/user', verifyToken, getUserById);
router.delete('/user', verifyToken, deleteUser);

// user goal routes
router.post('/user/goal', verifyToken, addGoalToUser);
router.put('/user/goal/:goalId', verifyToken, updateGoal);
router.delete('/user/goal/:goalId', verifyToken, deleteGoalById);

module.exports = router;

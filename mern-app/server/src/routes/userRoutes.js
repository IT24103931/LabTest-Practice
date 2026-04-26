const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateProfile } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.put('/profile', protect, updateProfile);

module.exports = router;

const router = require('express').Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

router.get('/users', authMiddleware, authController.getUsers);

module.exports = router;
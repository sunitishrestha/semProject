const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, logout } = require('../controllers/authController');
const { validate } = require('../middleware/validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    validate,
  ],
  register
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty(), validate],
  login
);

router.post('/refresh', [body('refreshToken').notEmpty(), validate], refresh);

router.post('/logout', [body('refreshToken').notEmpty(), validate], logout);

module.exports = router;

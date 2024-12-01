const express = require('express');
const {
  createRule,
  getRules,
  getRuleById,
  updateRule,
  deleteRule,
} = require('../controllers/rule.controller.js');

const router = express.Router();

// CRUD routes for "rules"
router.post('/', createRule); // Create Rule
router.get('/', getRules); // Get All Rules
router.get('/:id', getRuleById); // Get Rule by ID
router.put('/:id', updateRule); // Update Rule
router.delete('/:id', deleteRule); // Delete Rule

module.exports = router;

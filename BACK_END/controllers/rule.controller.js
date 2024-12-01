const { AppDataSource } = require('../config/database.js');
const Rule = require('../entities/Rule');

const ruleRepository = AppDataSource.getRepository('Rule');

// Create Rule
const createRule = async (req, res) => {
  try {
    const newRule = ruleRepository.create(req.body);
    const savedRule = await ruleRepository.save(newRule);
    res.status(201).json(savedRule);
  } catch (error) {
    console.error('Error creating rule:', error);
    res.status(500).json({ message: 'Error creating rule' });
  }
};

// Get All Rules
const getRules = async (req, res) => {
  try {
    const rules = await ruleRepository.find();
    res.status(200).json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(500).json({ message: 'Error fetching rules' });
  }
};

// Get Rule by ID
const getRuleById = async (req, res) => {
  try {
    const rule = await ruleRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    res.status(200).json(rule);
  } catch (error) {
    console.error('Error fetching rule:', error);
    res.status(500).json({ message: 'Error fetching rule' });
  }
};

// Update Rule
const updateRule = async (req, res) => {
  try {
    const rule = await ruleRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!rule) return res.status(404).json({ message: 'Rule not found' });

    ruleRepository.merge(rule, req.body);
    const updatedRule = await ruleRepository.save(rule);
    res.status(200).json(updatedRule);
  } catch (error) {
    console.error('Error updating rule:', error);
    res.status(500).json({ message: 'Error updating rule' });
  }
};

// Delete Rule
const deleteRule = async (req, res) => {
  try {
    const result = await ruleRepository.delete(req.params.id);
    if (result.affected === 0) return res.status(404).json({ message: 'Rule not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting rule:', error);
    res.status(500).json({ message: 'Error deleting rule' });
  }
};

module.exports = { createRule, getRules, getRuleById, updateRule, deleteRule };

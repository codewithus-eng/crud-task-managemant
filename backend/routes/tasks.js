const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const owner = req.user.id;
    const tasks = await Task.find({ owner }).sort({ createdAt: -1 }).lean();
    return res.json({ data: tasks });
  } catch (err) {
    console.error('Get tasks error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (task.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    return res.json({ data: task });
  } catch (err) {
    console.error('Get task error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const owner = req.user.id;
    const { title, description, priority, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const t = await Task.create({ owner, title, description, priority, status, dueDate });
    return res.status(201).json({ data: t });
  } catch (err) {
    console.error('Create task error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (task.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    const allowed = ['title','description','priority','status','dueDate'];
    allowed.forEach(k => {
      if (k in req.body) task[k] = req.body[k];
    });
    await task.save();
    return res.json({ data: task });
  } catch (err) {
    console.error('Update task error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (task.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    await task.remove();
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete task error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

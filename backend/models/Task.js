const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  priority: { type: String, enum: ['Low','Medium','High','Urgent'], default: 'Low' },
  status: { type: String, enum: ['Pending','In Progress','Done','Archived'], default: 'Pending' },
  dueDate: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);

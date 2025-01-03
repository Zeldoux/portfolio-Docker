const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  problems: { type: [String], default: [] }, 
  solutions: { type: [String], default: [] }, 
  skills: { type: [String], default: [] }, 
  userId: { type: String, required: true },
  imageUrl: [{ type: String }], 
  link: String, 
});

module.exports = mongoose.model('Project', projectSchema);
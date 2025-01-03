// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Mongoose will create a unique index for this field
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
});

// Ensure the unique index is created
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
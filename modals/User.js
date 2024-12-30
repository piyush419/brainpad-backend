const mongoose = require('mongoose');

// Define the user schema
const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'], // Updated error message
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Converts email to lowercase
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Email validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'], // Minimum length
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('User', usersSchema);

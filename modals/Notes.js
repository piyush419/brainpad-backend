const mongoose = require('mongoose');

// Define the user schema
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    userid:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required : true
    },
    isFav :{
       type :Boolean,
       default : false
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model('Note', notesSchema);

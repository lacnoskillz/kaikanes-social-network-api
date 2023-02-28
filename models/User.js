const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {type: String, unique: true , required: true, trim: true},
    email: {type: String, 
      required: true, 
      unique: true, 
      // regex that checks if the email entered matches the emailformat below 
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//  a virtual property `friendCount` that gets the amount of friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;

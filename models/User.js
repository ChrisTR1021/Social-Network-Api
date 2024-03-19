const { Schema, model, Types } = require('mongoose');
const thoughtSchema = require('./Thought');

//  Used for user model creation
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "You entered a invalid email, Please try again"],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
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



// Creates `friendCount` that retrieves 'friends' array 

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
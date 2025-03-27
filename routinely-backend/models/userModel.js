const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isGuest: { type: Boolean, default: false },
  goals: [
    {
      specific: String,
      measurableContext: String,
      measurableValue: Number,
      measurableUnit: String,
      achievable: String,
      relevant: String,
      timebound: Date,
      progress: Number
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);

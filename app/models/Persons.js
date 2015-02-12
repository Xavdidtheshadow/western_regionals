var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  name: String,
  email: String,
  available: Array,
  qualifications: Array,
  playing: Boolean,
  team: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
  other: String
});

mongoose.model('Person', PersonSchema);
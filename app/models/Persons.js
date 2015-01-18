var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  name: String,
  team: {type: mongoose.Schema.Types.ObjectId, ref: "Team"}
});

mongoose.model('Person', PersonSchema);
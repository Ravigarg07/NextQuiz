const mongoose = require('mongoose');
require("../DataBase/config")
const historySchema = new mongoose.Schema({
  email:String,
  name:String,
  topic:String,
  difficulty:String,
  ques:String,
  date:{
    type:Date,
    default:Date.now
  },
  marks:{
    type:Number,
    default:0
  },
  duration:{
    type:String,
    default:"10"
  }
})

module.exports = mongoose.model('quiz_histories',historySchema);
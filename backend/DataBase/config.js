const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = Mongoose.connect(process.env.connection_url+"NextQuiz_data");
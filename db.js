const mongoose = require("mongoose");
require('dotenv').config({path : './.env'});

mongoose.connect(process.env.MONGO_URL);

const todoSchmeas = mongoose.Schema({
        title : String,
        description : String,
        completed : Boolean
});

const todos = mongoose.model("todos", todoSchmeas);

module.exports = {
        todos
}

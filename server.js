const express = require("express");
const cors = require("cors");
const {todos} = require("./db");
const mongoose = require("mongoose");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/gettodos", async (req,res) =>{
   
    const todosInDb = await todos.find({});
    
    res.json(todosInDb);
    

    
});

server.post("/posttodos", async (req,res) =>{

    const title = req.body.title;
    const description = req.body.description;

    const todosInDb = await todos.create({
        title,
        description,
        completed: false
    });

    // console.log(todosInDb);
    
    res.json("todo added successfully");
    

    
});


server.put("/updatetodos" , async (req , res) =>{

const { id , completed} = req.body;

    const _id = mongoose.Types.ObjectId(this_id);

    const updatedDB = await todos.findByIdAndUpdate(
        _id,
        {
            completed
        },
        {
            new : true
        }
    );

    res.status(200);


})

server.listen(8080, () =>{
    console.log('server is running');
});
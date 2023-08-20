const express = require('express');
const jwt = require('jsonwebtoken')
const connection= require("./db")

const {userRouter} = require("./routes/userRoutes")

const {noteRouter}=require("./routes/noteRoutes")
const cors=require("cors")
const app = express();

app.use(express.json());

// for using the frontend when end point is different and will use cors
app.use(cors())

app.use("/users",userRouter)
app.use("/notes",noteRouter)



app.get('/', (req, res) => {
    res.status(200).send("Welcome to the HomePage")
       
   });
   

   app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db");
    console.log("server listening on port 8080");
    } catch (error) {
        console.log(error+"error");
    }
})
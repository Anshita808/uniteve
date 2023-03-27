const express = require("express");
const {connection} = require("./db");
const {userRoute} = require("./route/user.route");
require("dotenv").config();

const app = express();

app.use(express.json())

app.use("/users",userRoute)


app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("server is running");
})
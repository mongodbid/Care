require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const router = require("./router");
const cors = require("cors");
const cookieparse = require("cookie-parser");


try {
    mongoose.connect(process.env.MONGOOSE);
    
    console.log("DB Connected");
    
}


catch (error) {
    console.log(error);
}
const corsOption ={
    origin:"http://localhost:5173",
    methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
    credentials:true
}
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieparse());
app.use("/",router);


app.listen(5000, () => {
    console.log("App start");
})
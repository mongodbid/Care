const User = require("../Server/model.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const home = async (req, res) => {
    res.status(200).send("Hello");
}

const create = async (req, res) => {

    try {
        const { name, address, city, state, phoneNumber } = req.body;
        if (!name || !phoneNumber || !address || !city || !state) {
            return res.status(400).json({ message: "Fill all details" });
        }
        const isExist = await User.findOne({ phoneNumber });
        if (isExist) {
            return res.status(401).json({ message: "Already Exist" });
        }
        const user = new User({ name, address, city, state, phoneNumber });
        await user.save();

        res.status(200).json({ message: "Success" });

    }

    catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const admin_login = async (req, res) => {
    const { id, pass } = req.body;
    if (!id, !pass) {
        return res.status(400).json({ message: "Fill" });
    }
    const ID = "admin";
    const password = "@dmin";
    
    if (id!==ID) {
        return res.status(401).json({ message: "Wrong ID" });
    }
    if (password !== pass) {
        return res.status(401).json({ message: "Wrong password" });
    }
    const token = await jwt.sign({ ID: id }, process.env.JWT, {
        expiresIn: "24h"
    });

    const cookieoption = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    }
    res.cookie("token", token, cookieoption);
    res.status(200).json({ message: "Successfull Login" });
}

const get_data = async (req, res) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({message:"Session Expired"});
        }
        const id = await jwt.verify(token, process.env.JWT);
        const data = await User.find();
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const forgot_pass = async(req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.status(400).json({message:"Fill the email"});
    }
    const response = await User.findOne({email_admin:id});
    if(!response){
        return res.status(401).json({message:"Wrong Email"});
    }
    const token = await jwt.sign({ID:id},process.env.JWT,{expiresIn:"10m"});
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Your Password',
      text: `Link is valid for 10 minutes\n\n${process.env.FRONT_URL}` + token
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(400).json({message: "Not Sent!"});
      } else {
        try{
         const atIndex = email.indexOf("@");
         return res.status(200).json({message: `Mail sent to your mail ID: ${email.slice(0,2)}********${email.slice(atIndex-2,atIndex)}${email.slice(atIndex,email.length)}`});
        }
        catch(error){
          return res.status(400).json({message:error.message});
        }
      }
    });

}

const reset_password = async(req,res)=>{

    const{token,pass} = req.body;

    try {

        const ID = jwt.verify(token,process.env.JWT);
        const admin = await User.findOne({email_admin:ID});
        admin.pass_admin = pass;
        await admin.save();
        return res.status(200).json({message:"Password Updated"});
        
    } catch (error) {
        return res.status(401).json({message:"Link Expired"});
        
    }
    
}



module.exports = { create, home, admin_login, get_data, forgot_pass, reset_password }

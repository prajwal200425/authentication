const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")


main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB");
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/facebook");
}

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
});

userSchema.plugin(passportLocalMongoose);
const User =  mongoose.model("User" , "userSchema");

module.exports = User;
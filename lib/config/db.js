import mongoose from "mongoose"
import React from "react"
export const ConnectDB = async ()=>{
    await mongoose.connect("mongodb+srv://kitikenandini:Nandini6@cluster0.sklgvmk.mongodb.net/blog-app")
    console.log()
}

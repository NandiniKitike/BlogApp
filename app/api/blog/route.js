import { writeFile } from "fs/promises";
import { ConnectDB } from "../../../lib/config/db";

const { NextResponse } = require("next/server");
const { useEffect } = require("react");
const LoadDB = async ()=>{
    await ConnectDB()
}
LoadDB()
export async function GET(request){
    console.log("Blog Get Hit")
    return NextResponse.json({msg:"Api Working"})
}
export async function POST(request){
   const formData = await request.formData()
   const timestamp = Date.now()
   const image= formData.get("image")
   const imageByData = await image.arrayBuffer()
   const buffer=Buffer.from(imageByData)
   const path=`./public/${timestamp}_${image.name}`
   await writeFile(path, buffer)
   const imgUrl = "/${timestamp}_${image.name}"
   const blogData={
    title: `${formData.get('title')}`,
   description:`${formData.get("description")}`,
   category:`${formData.get('category')}`,
   author: `${formData.get('author')}`,
   image:`${imgUrl}`,
   authorImg: `${formData.get("authorImg")}`
}
   return NextResponse.json({imgUrl})
} 
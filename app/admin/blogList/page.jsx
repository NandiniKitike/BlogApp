"use client"
import axios from "axios"
import BlogTable from "../../../Components/AdminComponents/BlogTable"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
const page=()=>{
    const [blogs, setBlogs]= useState([])
const fetchBlogs = async ()=>{
    try {
        const response = await axios.get("/api/blog")
        setBlogs(response.data.blogs || [])
    } catch (error) {
        console.error("Error fetching blogs:", error)
        setBlogs([])
    }
}
const deleteBlog = async(mongoId)=>{
const response= await axios.delete('/api/blog', {
    params:{
        id: mongoId
    }
})
toast.success(response.data.msg)
fetchBlogs()
}
useEffect(()=>{
    fetchBlogs()
}, [])

return(
        <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
<h1>All Blogs</h1>
<div className=" h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
     <table className="mt-3 ml-2 w-full text-sm text-gray-500"> 
<thead className="text-sm text-gray-700 text-left uppercase bg-gray-50 ">
    <tr>
        <th scope="col" className="">
            Author name
        </th>
        <th scope="col" className="">
            Blog Title 
        </th>
        <th scope="col" className="">
                Blog Data
        </th>
        <th scope="col" className="">
            action
        </th>
    </tr>
</thead>
<tbody className="">
{blogs.map((item, index)=>{
    return <BlogTable key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog}/>
})}
</tbody>
     </table> 
</div>
        </div>
    )
}
export default page
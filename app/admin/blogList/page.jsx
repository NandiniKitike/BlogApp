// "use client"
// import axios from "axios"
// import BlogTable from "../../../Components/AdminComponents/BlogTable"
// import React, { useEffect, useState } from "react"
// import { toast } from "react-toastify"
// const page=()=>{
//     const [blogs, setBlogs]= useState([])
// const fetchBlogs = async ()=>{
//     try {
//         const response = await axios.get("/api/blog")
//         setBlogs(response.data.blogs || [])
//     } catch (error) {
//         console.error("Error fetching blogs:", error)
//         setBlogs([])
//     }
// }
// const deleteBlog = async(mongoId)=>{
// const response= await axios.delete('/api/blog', {
//     params:{
//         id: mongoId
//     }
// })
// toast.success(response.data.msg)
// fetchBlogs()
// }
// useEffect(()=>{
//     fetchBlogs()
// }, [])

// return(
//         <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
// <h1>All Blogs</h1>
// <div className=" h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
//      <table className="mt-3 ml-2 w-full text-sm text-gray-500"> 
// <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50 ">
//     <tr>
//         <th scope="col" className="">
//             Author name
//         </th>
//         <th scope="col" className="">
//             Blog Title 
//         </th>
//         <th scope="col" className="">
//                 Blog Data
//         </th>
//         <th scope="col" className="">
//             action
//         </th>
//     </tr>
// </thead>
// <tbody className="">
// {blogs.map((item, index)=>{
//     return <BlogTable key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog}/>
// })}
// </tbody>
//      </table> 
// </div>
//         </div>
//     )
// }
// export default page
// "use client"
// import axios from "axios"
// import BlogTable from "../../../Components/AdminComponents/BlogTable"
// import React, { useEffect, useState } from "react"
// import { toast } from "react-toastify"
// const page=()=>{
//     const [blogs, setBlogs]= useState([])
// const fetchBlogs = async ()=>{
//     try {
//         const response = await axios.get("/api/blog")
//         setBlogs(response.data.blogs || [])
//     } catch (error) {
//         console.error("Error fetching blogs:", error)
//         setBlogs([])
//     }
// }
// const deleteBlog = async(mongoId)=>{
// const response= await axios.delete('/api/blog', {
//     params:{
//         id: mongoId
//     }
// })
// toast.success(response.data.msg)
// fetchBlogs()
// }
// useEffect(()=>{
//     fetchBlogs()
// }, [])

// return(
     
// <div className="overflow-x-auto">
//   <table className="w-full text-sm text- border-collapse">
//     <thead>
//       <tr className="bg-gradient-to-r from-amber-400 to-amber-500 text-white uppercase text-left rounded-t-xl shadow-md">
//         <th className="py-3 px-4 font-medium tracking-wide">Author</th>
//         <th className="py-3 px-4 font-medium tracking-wide">Title</th>
//         <th className="py-3 px-4 font-medium tracking-wide">Date</th>
//         <th className="py-3 px-4 text-center font-medium tracking-wide">Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {blogs.map((item, index) => (
//         <BlogTable
//           key={index}
//           mongoId={item._id}
//           title={item.title}
//           author={item.author}
//           authorImg={item.authorImg}
//           date={item.date}
//           deleteBlog={deleteBlog}
//         />
//       ))}
//     </tbody>
//   </table>
// </div>

//     )
// }
// export default page
"use client";
import axios from "axios";
import BlogTable from "../../../Components/AdminComponents/BlogTable";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete("/api/blog", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">
        All Blogs
      </h1>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm text-slate-600 border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-amber-400 to-amber-500 text-white uppercase text-left rounded-t-xl shadow-md">
              <th className="py-3 px-4 font-medium tracking-wide">Author</th>
              <th className="py-3 px-4 font-medium tracking-wide">Title</th>
              <th className="py-3 px-4 font-medium tracking-wide">Date</th>
              <th className="py-3 px-4 text-center font-medium tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTable
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.authorImg}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {blogs.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 flex-1 mr-2">
                {item.title}
              </h3>
              <button
                onClick={() => deleteBlog(item._id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <p className="text-slate-600 text-sm mb-2">By {item.author}</p>
            <p className="text-slate-500 text-xs">{new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          No blogs found
        </div>
      )}
    </div>
  );
};

export default page;

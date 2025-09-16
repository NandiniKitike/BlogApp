// "use client"
// import React, {useEffect, useState} from "react"
// import {blog_data} from "../Assets/assets"
// import BlogItem from "./BlogItem"
// import axios from "axios"
// const BlogList=()=>{
//   const [menu, setMenu] = useState("All")
//     const [blogs, setBlogs] = useState([])
//     const fetchBlogs = async ()=>{
//       const response = await axios.get('/api/blog')
//       setBlogs(response.data.blogs)
//       console.log(response.data.blogs)
//     }
//     useEffect(()=>{
//       fetchBlogs()
//     }, [])
//   return(
//       <div>
// <div className="flex justify-center gap-6 my-10">
//     <button onClick={()=>setMenu("All")} className={menu==="All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>
//       All  
//     </button>
//     <button onClick={()=>setMenu("Technology")} className={menu==="Technology" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>
//       Technology</button>
//     <button onClick={()=>setMenu("Startup")}className={menu==="Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>Startup</button>
//     <button onClick={()=> setMenu("Lifestyle")} className={menu==="Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}>Lifestyle</button>
//     </div>
//     <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">{blogs.filter((item)=> menu==="All" ? true: item.category.trim()===menu).map((item)=>{
//       return <BlogItem
//         key={item._id}
//         id={item._id}
//         image={item.image.trim()}
//         title={item.title}
//         description={item.description}
//         category={item.category.trim()}
//       />})}</div>
//     </div>
//     )
// }
// export default BlogList
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="px-5 md:px-12 lg:px-28 bg-[#fef6e4] py-12">
      <div className="flex justify-center gap-3 sm:gap-6 mb-12 flex-wrap">
        {["All", "Technology", "Startup", "Lifestyle"].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              menu === cat
                ? "bg-[#ff8e3c] text-white shadow"
                : "bg-white text-[#2b2b2b] border border-gray-200 hover:bg-[#fff3e6]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs
          .filter((b) => (menu === "All" ? true : b.category.trim() === menu))
          .map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image.trim()}
              title={item.title}
              description={item.description}
              category={item.category.trim()}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;

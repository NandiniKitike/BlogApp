// "use client"
// import Image from "next/image"
// import { assets, blog_data } from "../../../Assets/assets"
// import React from "react"
// import { useEffect, useState } from "react"
// import Footer from "../../../Components/Footer";
// import Link from "next/link"
// import axios from "axios"
// const page=({params})=>{
//     const [data, setData] =useState(null)
//     const fetchBlogData= async ()=>{
//         const response = await axios.get('/api/blog', {
//             params: {
//                 id:params.id
//             }
//         })
// setData(response.data)
// }
//     useEffect(()=>{ 
//         fetchBlogData()
//     }, [])
// return(data?<>
// <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
//     <div className="flex justify-between items-center">
//         <Link href="/">
//         <Image src={assets.logo} alt="" width={180} className="w-[130px] sm:w-auto"/>
//         </Link>
//         <button className="flex items-center gap-2 border-round font-medium sm:py-3 py-1 px-3 sm:px-6 border border-solid shadow-[-7px_7px_0px_#000000] border-black">
//   Get Started 
//   <Image src={assets.arrow} alt="arrow icon" width={20} height={20} />
// </button>
//     </div>
//     <div className="text-center my-24">
//         <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
//         <Image className="mx-auto mt-6 border bordre-white rounded-full" src={data.authorImg} width={60} height={60} alt=""/>
//         <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
//     </div>
// </div>


// <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
// <Image className="border-4 border-white" src={data.image} alt="" width={1280} height={720}/>

// <div className="blog-content" dangerouslySetInnerHTML={{__html: data.description}}></div>
// <div className="my-24">
//     <p className="text-black font-semibold">Share this article on social media</p>
//     <div className="flex">
//         <Image src={assets.facebook_icon} alt="" width={50}/>
//         <Image src={assets.twitter_icon} alt="" width={50}/>
//         <Image src={assets.googleplus_icon} alt="" width={50}/>
//     </div>
// </div>
// </div>
// <Footer/>
//      </>:<></>
//     )
// }
// export default page
"use client";
import Image from "next/image";
import { assets } from "../../../Assets/assets";
import React, { useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import Link from "next/link";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id: params.id },
      });
      setData(response.data);
    } catch (err) {
      console.error("Error loading blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (!data) return null;

  return (
    <>
      {/* Header */}
      <header className="bg-slate-100 py-5 px-5 md:px-12 lg:px-28 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="Logo"
              width={180}
              className="w-[130px] sm:w-auto"
            />
          </Link>

          <button className="flex items-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium sm:py-3 py-1 px-3 sm:px-6 shadow-md transition">
            Get Started
            <Image src={assets.arrow} alt="arrow icon" width={20} height={20} />
          </button>
        </div>

        <div className="text-center my-20">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-slate-800">
            {data.title}
          </h1>
          <div className="mt-6 flex flex-col items-center">
            <Image
              className="rounded-full border-4 border-white shadow"
              src={data.authorImg}
              width={60}
              height={60}
              alt="author"
            />
            <p className="mt-2 text-slate-600 text-lg">{data.author}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-5 max-w-[800px] md:mx-auto -mt-24 mb-16 bg-white p-6 rounded-xl shadow">
        <Image
          className="border border-slate-200 rounded-md shadow-sm"
          src={data.image}
          alt={data.title}
          width={1280}
          height={720}
        />

        <div
          className="prose prose-slate max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="mt-12">
  <p className="text-slate-700 font-semibold mb-4">
    Share this article:
  </p>

  <div className="flex gap-4">
    {/* Facebook */}
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.href : ""
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="hover:scale-105 transition"
        src={assets.facebook_icon}
        alt="Share on Facebook"
        width={40}
        height={40}
      />
    </a>

    {/* Twitter */}
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.href : ""
      )}&text=${encodeURIComponent(data.title)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="hover:scale-105 transition"
        src={assets.twitter_icon}
        alt="Share on Twitter"
        width={40}
        height={40}
      />
    </a>

    {/* LinkedIn (better than Google Plus, which is discontinued) */}
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.href : ""
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="hover:scale-105 transition"
        src={assets.googleplus_icon} // Replace with a LinkedIn icon asset
        alt="Share on LinkedIn"
        width={40}
        height={40}
      />
    </a>
  </div>
</div>
      </main>

      <Footer />
    </>
  );
};

export default Page;


// "use client";
// import Image from "next/image";
// import { assets } from "../../../Assets/assets";
// import React, { useEffect, useState } from "react";
// import Footer from "../../../Components/Footer";
// import Link from "next/link";
// import axios from "axios";

// const Page = ({ params }) => {
//   const [data, setData] = useState(null);

//   const fetchBlogData = async () => {
//     try {
//       const response = await axios.get("/api/blog", {
//         params: { id: params.id },
//       });
//       setData(response.data);
//     } catch (err) {
//       console.error("Error loading blog:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBlogData();
//   }, []);

//   if (!data) return null;

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-slate-100 py-5 px-5 md:px-12 lg:px-28 border-b border-slate-200">
//         <div className="flex justify-between items-center">
//           <Link href="/">
//             <Image
//               src={assets.logo}
//               alt="Logo"
//               width={180}
//               className="w-[130px] sm:w-auto"
//             />
//           </Link>

//           {/* <button className="flex items-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium sm:py-3 py-1 px-3 sm:px-6 shadow-md transition">
//             Get Started
//             <Image src={assets.arrow} alt="arrow icon" width={20} height={20} />
//           </button> */}
//         </div>

//         <div className="text-center my-20">
//           <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-slate-800">
//             {data.title}
//           </h1>
//           <div className="mt-6 flex flex-col items-center">
//             {/* <Image
//               className="rounded-full border-4 border-white shadow"
//               src={data.authorImg}
//               width={60}
//               height={60}
//               alt="author"
//             /> */}
//             <p className="mt-2 text-slate-600 text-lg"></p>
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <main className="mx-5 max-w-[800px] md:mx-auto -mt-24 mb-16 bg-white p-6 rounded-xl shadow">
//         <Image
//           className="border border-slate-200 rounded-md shadow-sm"
//           src={data.image}
//           alt={data.title}
//           width={1280}
//           height={720}
//         />

//         <div
//           className="prose prose-slate max-w-none mt-8"
//           dangerouslySetInnerHTML={{ __html: data.description }}
//         ></div>

//         <div className="mt-12">
//   <p className="text-slate-700 font-semibold mb-4">
//     Share this article:
//   </p>

//   <div className="flex gap-4">
//     {/* Facebook */}
//     <a
//       href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         typeof window !== "undefined" ? window.location.href : ""
//       )}`}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Image
//         className="hover:scale-105 transition"
//         src={assets.facebook_icon}
//         alt="Share on Facebook"
//         width={40}
//         height={40}
//       />
//     </a>

//     {/* Twitter */}
//     <a
//       href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
//         typeof window !== "undefined" ? window.location.href : ""
//       )}&text=${encodeURIComponent(data.title)}`}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Image
//         className="hover:scale-105 transition"
//         src={assets.twitter_icon}
//         alt="Share on Twitter"
//         width={40}
//         height={40}
//       />
//     </a>

//     {/* LinkedIn (better than Google Plus, which is discontinued) */}
//     <a
//       href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         typeof window !== "undefined" ? window.location.href : ""
//       )}`}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Image
//         className="hover:scale-105 transition"
//         src={assets.googleplus_icon} // Replace with a LinkedIn icon asset
//         alt="Share on LinkedIn"
//         width={40}
//         height={40}
//       />
//     </a>
//   </div>
// </div>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default Page;
"use client";
import Image from "next/image";
import { assets } from "../../../Assets/assets";
import React, { useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import Link from "next/link";
import axios from "axios";

// ✅ FIXED: Updated for Next.js 15 - params is now a Promise
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [data, setData] = useState(null);
  const [blogId, setBlogId] = useState<string | null>(null);

  // ✅ FIXED: Extract id from params Promise
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setBlogId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  const fetchBlogData = async () => {
    if (!blogId) return; // Wait for blogId to be available
    
    try {
      const response = await axios.get("/api/blog", {
        params: { id: blogId },
      });
      setData(response.data);
    } catch (err) {
      console.error("Error loading blog:", err);
    }
  };

  // ✅ FIXED: Add blogId to dependency array
  useEffect(() => {
    fetchBlogData();
  }, [blogId]); // This fixes the ESLint warning

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

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
              priority
            />
          </Link>
        </div>

        <div className="text-center my-20">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-slate-800">
            {data.title}
          </h1>
          <div className="mt-6 flex flex-col items-center">
            <p className="mt-2 text-slate-600 text-lg">
              By {data.author || 'Anonymous'}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Category: {data.category}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-5 max-w-[800px] md:mx-auto -mt-24 mb-16 bg-white p-6 rounded-xl shadow">
        {/* ✅ IMPROVED: Better image handling */}
        {data.image && (
          <Image
            className="border border-slate-200 rounded-md shadow-sm w-full"
            src={data.image} // This will be /api/uploads/filename.jpg
            alt={data.title}
            width={1280}
            height={720}
            style={{ height: 'auto' }}
            priority
          />
        )}

        {/* ✅ IMPROVED: Better content rendering */}
        <div className="prose prose-slate max-w-none mt-8">
          {data.description ? (
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          ) : (
            <p className="text-slate-600">No content available.</p>
          )}
        </div>

        {/* Social Sharing */}
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
              className="hover:scale-105 transition-transform"
            >
              <Image
                src={assets.facebook_icon}
                alt="Share on Facebook"
                width={40}
                height={40}
              />
            </a>

            {/* Twitter/X */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}&text=${encodeURIComponent(data.title || 'Check out this blog post!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src={assets.twitter_icon}
                alt="Share on Twitter"
                width={40}
                height={40}
              />
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src={assets.googleplus_icon} // ✅ TODO: Replace with LinkedIn icon
                alt="Share on LinkedIn"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>

        {/* ✅ ADDED: Back to blogs link */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <Link 
            href="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Back to all blogs
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Page;

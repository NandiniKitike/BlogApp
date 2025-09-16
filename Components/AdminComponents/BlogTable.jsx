// import Image from "next/image"
// import React from "react"
// import {assets} from "../../Assets/assets"

// const BlogTable=({authorImg, title, author, date, deleteBlog, mongoId})=>{
//     const BlogData = new Date(date)
//     const isValidUrl = (string) => {
//         try {
//             new URL(string);
//             return true;
//         } catch (_) {
//             return false;
//         }
//     }
//     const getImageSrc = () => {
//         if (!authorImg || !isValidUrl(authorImg)) {
//             return assets.profile_icon;
//         }
//         return authorImg;
//     }

//     return(
//         <tr className="bg-white border-b">
//             <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                 <Image 
//                     width={40}  
//                     height={40} 
//                     alt="author" 
//                     src={getImageSrc()}
//                 />
//                 <p>{author ? author : "no author"}</p>
//             </th>
//             <td className="px-6 py-4">
//                 {title ? title : "no title"}
//             </td>
//             <td className="px-6 py-4">
//                 {BlogData.toDateString()}
//             </td>
//             <td onClick={()=>deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
//                 x
//             </td>
//         </tr>
//     )
// }
// export default BlogTable
import Image from "next/image";
import React from "react";
import { assets } from "../../Assets/assets";

const BlogTable = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const BlogData = new Date(date);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const getImageSrc = () => {
    if (!authorImg || !isValidUrl(authorImg)) return assets.profile_icon;
    return authorImg;
  };

  return (
    <tr className="bg-white hover:bg-[#fff6ec] transition-colors border-b">
      <th
        scope="row"
        className="flex items-center gap-3 px-6 py-4 font-medium text-gray-800 whitespace-nowrap"
      >
        <Image
          width={40}
          height={40}
          alt="author"
          src={getImageSrc()}
          className="rounded-full object-cover border border-gray-200"
        />
        <p>{author || "No author"}</p>
      </th>
      <td className="px-6 py-4 text-gray-700">{title || "No title"}</td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {BlogData.toDateString()}
      </td>
      <td
        onClick={() => deleteBlog(mongoId)}
        className="px-6 py-4 cursor-pointer text-red-500 font-bold hover:text-red-700"
      >
        ✕
      </td>
    </tr>
  );
};

export default BlogTable;

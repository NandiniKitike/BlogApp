// import Image from "next/image"
// import React from "react"
// import {arrow} from "../Assets/arrow.png"
// import {assets} from "../Assets/assets"
// import Link from "next/link"
// const BlogItem =({title, description, category, image, arrow, id})=>{
//     return(
//         <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
//             <Link href={`/blogs/${id}`}></Link>
//             <Image src={image} alt="" width={400} height={400} className="border-b border-black"/>
//             <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">{category}</p>
//             <div className="p-5">
//                  <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
//                  <p className="mb-3 text-sm tracking-tight text-gray-700" dangerouslySetInnerHTML={{__html:description.slice()}}></p>
//                  <Link href={`/blogs/${id}`} className="inline-flex items-center gap-3 py-2 font-semibold text-center">
//                     Read More <Image src={assets.arrow} alt="arrow icon" width={20} height={20} />
//                  </Link>
//             </div> 
//         </div>
//     )
// }  
// export default BlogItem
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { assets } from "../Assets/assets";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="rounded-t-2xl object-cover h-60 w-full"
        />
      </Link>
      <div className="p-5">
        <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-white bg-[#ff8e3c] rounded-full">
          {category}
        </span>
        <h5 className="text-lg font-semibold text-[#2b2b2b] hover:text-[#ff5a1f] transition-colors">
          {title}
        </h5>
        <p
          className="mt-2 mb-4 text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center gap-2 font-medium text-[#ff8e3c] hover:text-[#ff5a1f] transition"
        >
          Read More
          <Image src={assets.arrow} alt="arrow" width={18} height={18} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;


// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import uploadImg from "../../../Assets/upload_area.png";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Page = () => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     category: "Startup",
//     author: "Alex Bannett",
//     authorImg: "/author_img.png",
//   });

//   const onChangeHandler = (e) =>
//     setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(data).forEach(([k, v]) => formData.append(k, v));
//     formData.append("image", image);

//     try {
//       const res = await axios.post("/api/blog", formData);
//       if (res.data.success) {
//         toast.success(res.data.msg);
//         setData({
//           title: "",
//           description: "",
//           category: "Startup",
//           author: "Alex Bannett",
//           authorImg: "/author_img.png",
//         });
//         setImage(false);
//       } else toast.error("Error");
//     } catch {
//       toast.error("Upload failed");
//     }
//   };

//   return (
//    <section className="h-screen bg-slate-50 flex   px-4">
//   <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
//     <h1 className="text-2xl font-semibold text-slate-800 mb-4 text-center">
//       Create a New Blog Post
//     </h1>

//     <form onSubmit={onSubmitHandler} className="space-y-4">
//       {/* Thumbnail */}
//       <div>
//         <label className="block font-medium text-slate-700 mb-2">
//           Upload Thumbnail
//         </label>
//         <div className="flex items-center gap-4">
//           <label
//             htmlFor="image"
//             className="cursor-pointer inline-block rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 p-2"
//           >
//             <Image
//               src={!image ? uploadImg : URL.createObjectURL(image)}
//               width={160}
//               height={100}
//               alt="thumbnail"
//               className="rounded-md object-cover"
//             />
//           </label>
//           <input
//             type="file"
//             id="image"
//             onChange={(e) => setImage(e.target.files[0])}
//             hidden
//             required
//           />
//         </div>
//       </div>

//       {/* Blog Title */}
//       <div>
//         <label className="block font-medium text-slate-700 mb-1">
//           Blog Title
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={data.title}
//           onChange={onChangeHandler}
//           placeholder="Enter blog title"
//           className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-amber-400 focus:outline-none"
//           required
//         />
//       </div>

//       {/* Blog Description */}
//       <div>
//         {/* <label className="block font-medium text-slate-700 mb-1">
//           Blog Description
//         </label>
//         <textarea
//           name="description"
//           rows={3} // <-- reduced height
//           value={data.description}
//           onChange={onChangeHandler}
//           placeholder="Write the blog content..."
//           className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-amber-400 focus:outline-none"
//           required
//         /> */}
//         <label className="block font-medium mb-1">Blog Description</label>
//         <textarea
//           name="description"
//           rows={6}
//            value={data.description}
//            onChange={onChangeHandler}
//            className="w-full rounded-md border border-slate-200 p-3 shadow-sm focus:ring focus:ring-amber-400"
//           placeholder="Write content here"
//         />
//       </div>

//       {/* Blog Category */}
//       <div>
//         <label className="block font-medium text-slate-700 mb-1">
//           Blog Category
//         </label>
//         <select
//           name="category"
//           value={data.category}
//           onChange={onChangeHandler}
//           className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-amber-400 focus:outline-none"
//         >
//           <option value="Startup">Startup</option>
//           <option value="Technology">Technology</option>
//           <option value="Lifestyle">Lifestyle</option>
//         </select>
//       </div>

    
//       <div className="text-center mt-10">
//         <button
//           type="submit"
//           className=" items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-full shadow-md transition"
//         >
//           Add Blog
//         </button>
//       </div>
//     </form>
//   </div>
// </section>

//   );
// };

// export default Page;
"use client";
import Image from "next/image";
import React, { useState } from "react";
import uploadImg from "../../../Assets/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bannett",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    formData.append("image", image);
    try {
      const res = await axios.post("/api/blog", formData);
      if (res.data.success) {
        toast.success(res.data.msg);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bannett",
          authorImg: "/author_img.png",
        });
        setImage(false);
      } else toast.error("Error");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4 md:mb-6 text-center">
          Create a New Blog Post
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-4 md:space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block font-medium text-slate-700 mb-2 text-sm md:text-base">
              Upload Thumbnail
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label
                htmlFor="image"
                className="cursor-pointer inline-block rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 p-2 w-full sm:w-auto"
              >
                <Image
                  src={!image ? uploadImg : URL.createObjectURL(image)}
                  width={160}
                  height={100}
                  alt="thumbnail"
                  className="rounded-md object-cover mx-auto"
                />
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
                required
              />
            </div>
          </div>

          {/* Blog Title */}
          <div>
            <label className="block font-medium text-slate-700 mb-1 text-sm md:text-base">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={onChangeHandler}
              placeholder="Enter blog title"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm md:text-base shadow-sm focus:ring focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          {/* Blog Description */}
          <div>
            <label className="block font-medium text-slate-700 mb-1 text-sm md:text-base">
              Blog Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={data.description}
              onChange={onChangeHandler}
              className="w-full rounded-lg border border-slate-300 p-3 text-sm md:text-base shadow-sm focus:ring focus:ring-amber-400 focus:outline-none"
              placeholder="Write content here"
              required
            />
          </div>

          {/* Blog Category */}
          <div>
            <label className="block font-medium text-slate-700 mb-1 text-sm md:text-base">
              Blog Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm md:text-base shadow-sm focus:ring focus:ring-amber-400 focus:outline-none"
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 py-3 rounded-full shadow-md transition duration-200"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;

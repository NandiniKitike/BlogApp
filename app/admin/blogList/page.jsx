
//   "use client";
// import axios from "axios";
// import BlogTable from "../../../Components/AdminComponents/BlogTable";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const Page = () => {
//   const [blogs, setBlogs] = useState([]);

//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get("/api/blog");
//       setBlogs(response.data.blogs || []);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       setBlogs([]);
//     }
//   };

//     const deleteBlog = async (mongoId) => {
//     const response = await axios.delete("/api/blog", {
//       params: {
//         id: mongoId,
//       },
//     });
//     toast.success(response.data.msg);
//     fetchBlogs();
//   };


//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="w-full">
//       {/* Page Header */}
//       <header className="mb-6">
//         <h1 className="text-2xl font-bold text-slate-800">All Blogs</h1>
//         <p className="text-slate-500 text-sm mt-1">
//           Manage your blog posts below
//         </p>
//       </header>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
//   <table className="w-full text-sm text-slate-700 border-collapse table-auto">
//     <thead className="bg-gradient-to-r from-amber-400 to-amber-500 text-white uppercase">
//       <tr>
//         <th className="py-3 px-4 font-semibold text-left">Title</th>
//         <th className="py-3 px-4 font-semibold text-left">Date</th>
//         <th className="py-3 px-4 font-semibold text-center">Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {blogs.map((item) => (
//         <BlogTable
//           key={item._id}
//           mongoId={item._id}
//           title={item.title}
//           date={item.date}
//           deleteBlog={deleteBlog}
//         />
//       ))}
//     </tbody>
//   </table>
// </div>


//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {blogs.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-lg shadow p-4 border border-slate-200"
//           >
//             <div className="flex items-start justify-between mb-2">
//               <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 flex-1">
//                 {item.title}
//               </h3>
//               <button
//                 onClick={() => deleteBlog(item._id)}
//                 className="text-red-500 hover:text-red-700 p-1"
//                 aria-label="Delete blog"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <p className="text-slate-500 text-xs">
//               {new Date(item.date).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {blogs.length === 0 && (
//         <div className="text-center py-8 text-slate-500">No blogs found</div>
//       )}
//     </div>
//   );
// };

// export default Page;
"use client";
import axios from "axios";
import BlogTable from "../../../Components/AdminComponents/BlogTable";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      setDeleting(mongoId);
      const response = await axios.delete("/api/blog", {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      await fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              All Blogs
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Manage your blog posts • {blogs.length} total
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={fetchBlogs}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Desktop Table */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                    Blog Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                    Published Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((item, index) => (
                  <tr 
                    key={item._id} 
                    className="group hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-xs font-semibold text-blue-600">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            weekday: 'long'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => deleteBlog(item._id)}
                          disabled={deleting === item._id}
                          className={`group flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200 ${
                            deleting === item._id
                              ? 'border-red-200 bg-red-50 cursor-not-allowed'
                              : 'border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 hover:scale-105'
                          }`}
                          title="Delete blog"
                        >
                          {deleting === item._id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                          ) : (
                            <svg
                              className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {blogs.map((item, index) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start flex-1 mr-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 text-base leading-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteBlog(item._id)}
                disabled={deleting === item._id}
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 ${
                  deleting === item._id
                    ? 'border-red-200 bg-red-50 cursor-not-allowed'
                    : 'border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 hover:scale-105'
                }`}
                title="Delete blog"
              >
                {deleting === item._id ? (
                  <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {blogs.length === 0 && <EmptyState onRefresh={fetchBlogs} />}
    </div>
  );
};

// Loading Component
const LoadingState = () => (
  <div className="w-full max-w-7xl mx-auto">
    <div className="mb-8">
      <div className="h-8 bg-slate-200 rounded-lg w-48 mb-2 animate-pulse"></div>
      <div className="h-4 bg-slate-100 rounded w-32 animate-pulse"></div>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2"></div>
            </div>
            <div className="w-9 h-9 bg-slate-100 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ onRefresh }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">No blogs found</h3>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">
        There are no blog posts to display. Create your first blog post to get started.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRefresh}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200"
        >
          Refresh List
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-200">
          Create New Blog
        </button>
      </div>
    </div>
  </div>
);

export default Page;

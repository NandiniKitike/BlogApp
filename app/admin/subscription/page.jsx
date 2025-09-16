
// "use client";
// import axios from "axios";
// import SubTableItem from "../../../Components/AdminComponents/SubTableItem";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Page = () => {
//   const [email, setEmail] = useState([]);

//   const fetchEmails = async () => {
//     try {
//       const response = await axios.get("/api/email");
//       setEmail(response.data.emails || []);
//     } catch (err) {
//       console.error("Error fetching emails:", err);
//       setEmail([]);
//     }
//   };

//   const deleteEmail = async (mongoId) => {
//     try {
//       const response = await axios.delete("/api/email", {
//         params: { id: mongoId },
//       });
//       if (response.data.success) {
//         toast.success(response.data.msg);
//         setEmail((prev) => prev.filter((item) => item._id !== mongoId));
//       } else toast.error("Error deleting email");
//     } catch {
//       toast.error("Deletion failed");
//     }
//   };

//   useEffect(() => {
//     fetchEmails();
//   }, []);

//   return (
//   <div className="top-0 flex-1 sm:pt-16">
//     <h1 className="text-3xl font-bold text-slate-800 mb-6 ">
//       All Subscriptions
//     </h1>

//     <div className="w-full max-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
//       <table className="w-full text-sm text-slate-600">
//         <thead className="bg-gradient-to-r from-amber-200 to-amber-300 text-slate-800 uppercase text-left text-xs">
//           <tr>
//             <th className="px-6 py-3">Email Subscription</th>
//             <th className="px-6 py-3 hidden sm:table-cell">Date</th>
//             <th className="px-6 py-3 text-center">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {email.length > 0 ? (
//             email.map((item, index) => (
//               <SubTableItem
//                 key={index}
//                 mongoId={item._id}
//                 email={item.email}
//                 date={item.date}
//                 deleteEmail={deleteEmail}
//               />
//             ))
//           ) : (
//             <tr className="bg-white">
//               <td
//                 colSpan={3}
//                 className="text-center py-6 text-slate-500 font-medium"
//               >
//                 No subscriptions found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
// };

// export default Page;
"use client";
import axios from "axios";
import SubTableItem from "../../../Components/AdminComponents/SubTableItem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [email, setEmail] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmail(response.data.emails || []);
    } catch (err) {
      console.error("Error fetching emails:", err);
      setEmail([]);
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoId },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail((prev) => prev.filter((item) => item._id !== mongoId));
      } else toast.error("Error deleting email");
    } catch {
      toast.error("Deletion failed");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className=" min-h-screen pt-0">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        All Subscriptions
      </h1>

      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-sm text-slate-600">
          <thead className="bg-gradient-to-r from-amber-200 to-amber-300 text-slate-800 uppercase text-left text-xs sticky top-0">
            <tr>
              <th className="px-6 py-3">Email Subscription</th>
              <th className="px-6 py-3 hidden sm:table-cell">Date</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {email.length > 0 ? (
              email.map((item, index) => (
                <SubTableItem
                  key={index}
                  mongoId={item._id}
                  email={item.email}
                  date={item.date}
                  deleteEmail={deleteEmail}
                />
              ))
            ) : (
              <tr className="bg-white">
                <td
                  colSpan={3}
                  className="text-center py-6 text-slate-500 font-medium"
                >
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;

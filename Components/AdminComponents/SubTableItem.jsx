// import React from "react"
// const SubTableItem=({email, mongoId, deleteEmail, date})=>{
//     const emailDate =new Date(date)
//     return(
//         <tr className="bg-white border-b  text-left">
//             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                 {email?email: "No email"}
//             </th>
//             <td className="px-6 py-4 hidden sm:block">
//                 {emailDate.toDateString()}
//             </td>
//             <td onClick={()=>deleteEmail(mongoId)} className="px-6 py-4 cursor-pointer">x</td>
//         </tr>
//     )
// }
// export default SubTableItem
import React from "react";

const SubTableItem = ({ email, mongoId, deleteEmail, date }) => {
  const emailDate = new Date(date);

  return (
    <tr className="bg-white hover:bg-amber-50 transition border-b border-gray-200">
      {/* Email */}
      <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
        {email || "No email"}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-slate-600 hidden sm:table-cell">
        {emailDate.toDateString()}
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => deleteEmail(mongoId)}
          className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full shadow-sm transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubTableItem;

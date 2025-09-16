// import Image from "next/image";
// import Sidebar from "../../Components/AdminComponents/Sidebar";
// import profileIcon from "../../Assets/profile_icon.png"
// import { ToastContainer } from "react-toastify";
// export default function Layout({children}){
//     return(
//         <>
//         <div className="flex">
//             <ToastContainer theme="dark"/>
//            <Sidebar/>
//            <div className="flex flex-col w-full">
//             <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border">
//                 <h3 className="font-medium">Admin Panel</h3>
//                 <Image src={profileIcon} width={40} alt=""/>
//             </div>
//             {children}
//            </div>
//         </div>
//         </>
//     )
// }
//  import Image from "next/image";
// import Sidebar from "../../Components/AdminComponents/Sidebar";
// import profileIcon from "../../Assets/profile_icon.png";
// import { ToastContainer } from "react-toastify";

// export default function Layout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-slate-50 text-slate-800">
//       <ToastContainer theme="dark" />
//       <Sidebar />
//       <div className="flex flex-col w-full">
//         <header className="flex items-center justify-between py-3 px-8 border-b border-slate-200 bg-white">
//           <h3 className="text-lg font-semibold tracking-tight">Admin Panel</h3>
//           <Image src={profileIcon} width={40} height={40} alt="Profile" />
//         </header>
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import Sidebar from "../../Components/AdminComponents/Sidebar";
import profileIcon from "../../Assets/profile_icon.png";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <ToastContainer theme="dark" />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col w-full lg:ml-0">
        <header className="flex items-center justify-between py-3 px-4 md:px-8 border-b border-slate-200 bg-white sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h3 className="text-lg font-semibold tracking-tight">Admin Panel</h3>
          {/* <Image src={profileIcon} width={40} height={40} alt="Profile" className="rounded-full" /> */}
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

import Image from "next/image";
import Sidebar from "../../Components/AdminComponents/Sidebar";
import profileIcon from "../../Assets/profile_icon.png"
import { ToastContainer } from "react-toastify";
export default function Layout({children}){
    return(
        <>
        <div className="flex">
            <ToastContainer theme="dark"/>
           <Sidebar/>
           <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border">
                <h3 className="font-medium">Admin Panel</h3>
                <Image src={profileIcon} width={40} alt=""/>
            </div>
            {children}
           </div>
        </div>
        </>
    )
}
 
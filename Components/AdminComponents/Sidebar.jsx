import React from "react"
import { assets } from "../../Assets/assets"
import Image from "next/image"
import Link from "next/link"
const Sidebar = () => {
    return (
        <div className="flex flex-col bg-slate-100">
            <div className="px-10 sm:pl-14 py-3 border border-black">
                <Image src={assets.logo} width={120} alt="" />
            </div>
            <div className="w-56 sm:w:80 h-[100vh] relative py-12 border border-black">
                <div className="w-[50%] sm:w-[80%] absolute right-0">
                    <Link href="/admin/addProduct" className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_000000]">
                        <Image src={assets.add_icon} alt="" width={28} /><p>Add blogs</p>
                    </Link>
                    <Link href="/admin/blogList"className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_000000]">
                        <Image src={assets.blog_icon} alt="" width={28} /><p>Blog list</p>
                    </Link>
                    <Link href="/admin/subscription"className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_000000]">
                        <Image src={assets.email_icon} alt="" width={28} /><p>subscription</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}
export default Sidebar
"use client"
import axios from "axios"
import { assets } from "../Assets/assets"
import Image from "next/image"
import React, { useState } from "react"
import { toast } from "react-toastify";
const Header = () => {
    const [email, setEmail] = useState("")
    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        const formData= new FormData()
        formData.append("email", email)
        const response = await axios.post("/api/email", formData)
        if(response.data.success){
            toast.success(response.data.msg)
            setEmail("")
        }
        else{
            toast.error()
        }
    } 
    return (
        <div className="py-5 px-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
                <Image src={assets.logo} width={180} alt="logo" className="w-[130px] sm:w-auto" />
                <button className="flex  items-center gap-2 border-round font-medium sm:py-3 py-1 px-3 sm:px-6 border border-solid shadow-[-7px_7px_0px_#000000] border-black">Get Started <Image src={assets.arrow} alt="arrow icon" width={20} height={20} /></button>
            </div>
            <div className="text-center my-8">
                <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
                <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
                    Lorem Ipsum is simply dummy text of the printing
                </p>

                <form onSubmit={onSubmitHandler} className="flex items-center justify-center max-w-[500px] mx-auto mt-10 border border-black shadow-[-7px_7px_#000000] ">
                    <input onChange={(e)=>setEmail(e.target.value)} value={email}
                        type="email"
                        placeholder="Enter your email"
                        className="pl-4 py-3 outline-none flex-1"
                    />
                    <button className="border-l border-black py-3 px-6 active:bg-gray-600 active:text-white">
                        Subscribe
                    </button>
                </form>
            </div>

        </div>
    )
}
export default Header
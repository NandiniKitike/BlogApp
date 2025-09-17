
"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { assets } from "../Assets/assets";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const res = await axios.post("/api/email", formData);
    if (res.data.success) {
      toast.success(res.data.msg);
      setEmail("");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#ff8e3c] to-[#ff5a1f] text-white py-12 px-5 md:px-12 lg:px-28 rounded-b-3xl shadow-md">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={160}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />
         <Link href="/admin/addProduct">
        <button className="flex items-center gap-2 bg-white text-[#ff5a1f] font-medium py-2 px-5 rounded-full shadow hover:scale-105 transition">
          Get Started
          <Image src={assets.arrow} alt="arrow icon" width={18} height={18} />
        </button>
        </Link>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-3xl sm:text-5xl font-bold">Latest Blogs</h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base opacity-90">
          Discover stories, tips, and insights to inspire your journey.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-between bg-white mt-8 rounded-full overflow-hidden shadow-md max-w-xl mx-auto"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="pl-5 py-3 w-full text-gray-700 outline-none"
          />
          <button className="bg-[#ff8e3c] hover:bg-[#ff5a1f] text-white px-6 py-3 transition">
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
};
export default Header;

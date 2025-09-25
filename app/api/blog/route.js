import { writeFile, mkdir } from "fs/promises";
import { ConnectDB } from "../../../lib/config/db";
import BlogModel from "../../../lib/models/BlogModel";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request) {
  try {
    await ConnectDB(); 
    const blogId = request.nextUrl.searchParams.get("id");
    
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    }

    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get("image");

    let imgUrl = "";

    if (image && typeof image.arrayBuffer === "function") {
      // ✅ SAVE TO UPLOADS FOLDER (NOT PUBLIC)
      const uploadsDir = path.join(process.cwd(), 'uploads');
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const imageByData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByData);
      
      // ✅ FIXED: Save to uploads folder, not public
      const filename = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
      const filepath = path.join(uploadsDir, filename);
      await writeFile(filepath, buffer);
      
      // ✅ FIXED: Use API route URL instead of direct file path
      imgUrl = `/api/uploads/${filename}`;
    } else {
      imgUrl = formData.get("image") || "";
    }

    const blogData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      category: formData.get("category") || "",
      author: formData.get("author") || "",
      image: imgUrl, // This will now be /api/uploads/filename.jpg
      authorImg: formData.get("authorImg") || "",
    };

    const savedBlog = await BlogModel.create(blogData);
    console.log("Blog saved:", savedBlog._id);

    return NextResponse.json({ 
      success: true, 
      msg: "Blog added successfully!",
      imageUrl: imgUrl
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB();
    const id = await request.nextUrl.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Blog ID is required" });
    }

    // Get blog data before deleting to remove image file
    const blog = await BlogModel.findById(id);
    
    if (blog && blog.image && blog.image.startsWith('/api/uploads/')) {
      // Extract filename from URL and delete physical file
      const filename = blog.image.replace('/api/uploads/', '');
      const filepath = path.join(process.cwd(), 'uploads', filename);
      
      // Delete file if it exists
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

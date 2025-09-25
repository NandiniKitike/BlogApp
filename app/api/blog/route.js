// import { writeFile } from "fs/promises";
// import { ConnectDB } from "../../../lib/config/db";
// import BlogModel from "../../../lib/models/BlogModel";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     await ConnectDB(); // 👈 Ensure DB connection before querying

//     const blogId = request.nextUrl.searchParams.get("id");
//     if (blogId) {
//       const blog = await BlogModel.findById(blogId);
//       return NextResponse.json(blog);
//     }

//     const blogs = await BlogModel.find({});
//     return NextResponse.json({ blogs });
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

// export async function POST(request) {
//   try {
//     await ConnectDB(); // already correct

//     const formData = await request.formData();
//     const timestamp = Date.now();
//     const image = formData.get("image");

//     let imgUrl = "";

//     if (image && typeof image.arrayBuffer === "function") {
//       const imageByData = await image.arrayBuffer();
//       const buffer = Buffer.from(imageByData);
//       const path = `./public/${timestamp}_${image.name}`;
//       await writeFile(path, buffer);
//       imgUrl = `/${timestamp}_${image.name}`;
//     } else {
//       imgUrl = formData.get("image") || "";
//     }

//     const blogData = {
//       title: formData.get("title") || "",
//       description: formData.get("description") || "",
//       category: formData.get("category") || "",
//       author: formData.get("author") || "",
//       image: imgUrl,
//       authorImg: formData.get("authorImg") || "",
//     };

//     const savedBlog = await BlogModel.create(blogData);
//     console.log("Blog saved:", savedBlog._id);

//     return NextResponse.json({ success: true, msg: "Blog added" });
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
// export async function DELETE(request){
//   const id=await request.nextUrl.searchParams.get("id")
//   await BlogModel.findByIdAndDelete(id)
//   return NextResponse.json({success: true, msg:"Blog deleted successfully"})
// }
import { v2 as cloudinary } from 'cloudinary'
import { ConnectDB } from "../../../lib/config/db"
import BlogModel from "../../../lib/models/BlogModel"
import { NextResponse } from "next/server"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request) {
  try {
    await ConnectDB()
    const blogId = request.nextUrl.searchParams.get("id")
    
    if (blogId) {
      const blog = await BlogModel.findById(blogId)
      return NextResponse.json(blog)
    }

    const blogs = await BlogModel.find({})
    return NextResponse.json({ blogs })
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ success: false, error: error.message })
  }
}

export async function POST(request) {
  try {
    await ConnectDB()

    const formData = await request.formData()
    const image = formData.get("image")

    let imgUrl = ""

    if (image && typeof image.arrayBuffer === "function") {
      const imageByData = await image.arrayBuffer()
      const buffer = Buffer.from(imageByData)
      
      
      
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: 'blog-images',
            resource_type: 'image',
            public_id: `blog_${Date.now()}`, // Unique filename
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error)
              reject(error)
            } else {
              resolve(result)
            }
          }
        ).end(buffer)
      })
      
      imgUrl = result.secure_url // Cloudinary CDN URL
    } else {
      imgUrl = formData.get("image") || ""
    }

    const blogData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      category: formData.get("category") || "",
      author: formData.get("author") || "",
      image: imgUrl, // Cloudinary URL: https://res.cloudinary.com/...
      authorImg: formData.get("authorImg") || "",
    }

    const savedBlog = await BlogModel.create(blogData)
    console.log("Blog saved:", savedBlog._id)

    return NextResponse.json({ 
      success: true, 
      msg: "Blog added successfully!",
      imageUrl: imgUrl,
      blogId: savedBlog._id
    })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ success: false, error: error.message })
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB()
    const id = request.nextUrl.searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Blog ID is required" })
    }

    // Get blog data before deleting (for future Cloudinary cleanup)
    const blog = await BlogModel.findById(id)
    
    if (blog && blog.image && blog.image.includes('cloudinary.com')) {
      // Optional: Delete from Cloudinary too
      try {
        const publicId = blog.image.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`blog-images/${publicId}`)
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError)
        // Continue with database deletion even if Cloudinary fails
      }
    }

    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true, msg: "Blog deleted successfully" })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ success: false, error: error.message })
  }
}

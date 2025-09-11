import { writeFile } from "fs/promises";
import { ConnectDB } from "../../../lib/config/db";
import BlogModel from "../../../lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB(); // 👈 Ensure DB connection before querying

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
    await ConnectDB(); // already correct

    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get("image");

    let imgUrl = "";

    if (image && typeof image.arrayBuffer === "function") {
      const imageByData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByData);
      const path = `./public/${timestamp}_${image.name}`;
      await writeFile(path, buffer);
      imgUrl = `/${timestamp}_${image.name}`;
    } else {
      imgUrl = formData.get("image") || "";
    }

    const blogData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      category: formData.get("category") || "",
      author: formData.get("author") || "",
      image: imgUrl,
      authorImg: formData.get("authorImg") || "",
    };

    const savedBlog = await BlogModel.create(blogData);
    console.log("Blog saved:", savedBlog._id);

    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function DELETE(request){
  const id=await request.nextUrl.searchParams.get("id")
  await EmailModel.findByIdAndDelete(id)
  return NextResponse.json({success: true, msg:"Email deleted successfully"})
}
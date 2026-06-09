# 📝 Next.js 15 Blog Application

A premium, full-stack, and high-performance blog application built on **Next.js 15**, **React 19**, **Tailwind CSS v4**, **MongoDB (Mongoose)**, and **Cloudinary**. This project features a elegant client interface for readers, category-based filtering, dynamic post loading, an admin dashboard to publish/delete articles, and a newsletter subscription system.

---

## 🚀 Key Features

### **Reader Interface (Client)**
*   **Dynamic Landing Page:** Features a hero banner, a search/newsletter subscribe form, and a responsive grid displaying blog posts.
*   **Category-based Filtering:** Instant filter mechanism to browse posts across `Technology`, `Startup`, and `Lifestyle` categories.
*   **Detail View:** Rich single-article detail pages using dynamic routes (`/blogs/[id]`), optimized image layouts, and social media sharing buttons (Facebook, Twitter, LinkedIn).
*   **Newsletter Subscription:** Real-time email validation and subscription, showing toast messages via `react-toastify`.

### **Admin Dashboard (`/admin`)**
*   **Add Blog Post:** A clean form to input blog title, select category, upload cover image, type description, and select/assign authors. Integrates directly with Cloudinary for fast CDN image hosting.
*   **Blog List Management:** A tabular view displaying all published blog posts with real-time deletion. Deleting a blog post automatically triggers a cleanup step that deletes the corresponding image from Cloudinary.
*   **Subscribers List:** Track and manage newsletter sign-ups with real-time subscription list rendering and single-click removal.

---

## 🛠️ Tech Stack

| Component | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `^15.5.0` | App Router, Dynamic params handling & Turbopack support |
| **Frontend UI** | [React](https://react.dev/) | `^19.1.0` | Interactive UI elements, Client Hooks, State Management |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.0.0` | Next-gen utility-first styling with `@tailwindcss/postcss` |
| **Database** | [MongoDB](https://www.mongodb.com/) | `^8.18.0` | Stored in Atlas database, queried using Mongoose schemas |
| **Cloud Storage** | [Cloudinary](https://cloudinary.com/) | `^2.7.0` | Remote cloud hosting for optimized blog images |
| **HTTP Client** | [Axios](https://axios-http.com/) | `^1.11.0` | Asynchronous API request execution for forms & fetches |
| **Notifications** | [React Toastify](https://github.com/fkhadra/react-toastify) | `^11.0.5` | Elegant real-time dark theme alert toasts |

---

## 📁 Project Directory Structure

```text
blog-app/
├── app/                        # Next.js 15 App Router
│   ├── admin/                  # Admin Dashboard layout & pages
│   │   ├── addProduct/         # Route: Add new blog posts
│   │   ├── blogList/           # Route: Manage and delete blog posts
│   │   ├── subscription/       # Route: Manage subscriber emails
│   │   ├── layout.jsx          # Admin Sidebar navigation & toast provider
│   │   └── page.jsx            # Admin dashboard landing
│   ├── api/                    # Server-side API endpoints
│   │   ├── blog/               # GET (single/all), POST (add), DELETE (remove) blogs
│   │   └── email/              # GET, POST, DELETE newsletter subscribers
│   ├── blogs/                  # Client-side blogs module
│   │   └── [id]/               # Dynamic single post route with params handling
│   ├── globals.css             # Tailwind v4 imports, global rules, custom scrollbars
│   ├── layout.js               # Main HTML wrapper structure
│   └── page.js                 # Landing page routing & component stitching
├── Components/                 # Shared UI Components
│   ├── AdminComponents/        # Admin-specific component assets
│   │   ├── BlogTable.jsx       # Individual table row for managing blogs
│   │   ├── Sidebar.jsx         # Sidebar navigation wrapper
│   │   └── SubTableItem.jsx    # Individual table row for subscriber list
│   ├── BlogItem.jsx            # Blog preview card element
│   ├── BlogList.jsx            # List wrapper with filter navigation
│   ├── Footer.jsx              # Footer links & branding section
│   └── Header.jsx              # Hero section & newsletter form
├── lib/                        # Server utility folder
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose database connection
│   └── models/
│       ├── BlogModel.js        # Blog data validation schema
│       └── EmailModel.js       # Email subscriber validation schema
├── public/                     # Static assets & image outputs
├── Assets/                     # Pre-packaged graphics & icons
├── .env                        # Local credentials & secret configuration
├── next.config.mjs             # Next.js optimization configuration
└── package.json                # Project dependencies & startup scripts
```

---

## ⚙️ Configuration & Environment Setup

### 1. **Environment Variables (`.env`)**
Create a `.env` file in the root directory and populate it with your database and Cloudinary credentials:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# MongoDB Atlas URL (for reference)
mongodb_url="mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog-app"
```

### 2. **Database Setup**
The database connection is initiated through [lib/config/db.js](file:///e:/Personal%20Projects/blog-app/lib/config/db.js). By default, it connects to a MongoDB Atlas cluster. If you wish to use a different database configuration or dynamic URI:
1. Update [lib/config/db.js](file:///e:/Personal%20Projects/blog-app/lib/config/db.js) to leverage `process.env.mongodb_url`.

### 3. **Next.js Image Domain Configuration**
To load and optimize external Cloudinary images using Next.js `<Image />` component, add `remotePatterns` configuration in your [next.config.mjs](file:///e:/Personal%20Projects/blog-app/next.config.mjs):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## 🏃 Getting Started

Follow these instructions to run the application in a local development environment:

### **1. Install Dependencies**
```bash
npm install
```

### **2. Launch the Local Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the client-side app. Visit [http://localhost:3000/admin/addProduct](http://localhost:3000/admin/addProduct) to access the dashboard.

### **3. Linter Execution**
Ensure clean and standardized code guidelines by running ESLint rules:
```bash
npm run lint
```

### **4. Production Build**
Build a production-ready bundle and run the server:
```bash
npm run build
npm start
```

---

## 📖 API Endpoints Summary

### **Blog Route** (`/api/blog`)
*   `GET`: Fetch all posts or a single post by `id` query parameter (e.g. `/api/blog?id=66c12c...`).
*   `POST`: Publish a new blog post. Receives `Multipart/Form-Data` with keys `title`, `description`, `category`, `author`, `authorImg`, and `image` (file). File is streamed directly to Cloudinary.
*   `DELETE`: Remove blog post by `id` query parameter (e.g. `/api/blog?id=66c12c...`). Also attempts to clean up the associated image asset from Cloudinary.

### **Email Route** (`/api/email`)
*   `GET`: List all active subscriber email addresses.
*   `POST`: Submit an email subscription. Receives `Multipart/Form-Data` containing `email`.
*   `DELETE`: Delete a newsletter subscription by `id` query parameter.


DEPLOYMENT LINK : https://mega-blog-tau-ebon.vercel.app/

📌 Step 1: Install Required Dependencies
npm install react-redux react-router-dom @reduxjs/toolkit appwrite @tinymce/tinymce-react html-react-parser react-hook-form


These libraries handle:

State management (Redux Toolkit)

Routing (React Router)

Backend services (Appwrite)

Rich text editor (TinyMCE)

Form handling (React Hook Form)





📌 Step 2: Create Environment Variables

Create a .env file in the root directory:

VITE_SOME_KEY=123


Access it in your project:

console.log(import.meta.env.VITE_SOME_KEY)






📌 Step 3: Add Appwrite Environment Keys
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
VITE_TINYMCE_API_KEY=""





📌 Step 4: Set Up Appwrite Backend

Create an Appwrite account

Create a new project

Copy:

API Endpoint

Project ID






📌 Step 5: Configure Appwrite Services

Inside Appwrite console:

✅ Database

Create a database and note its ID

✅ Collection (Table)

Add:

Columns (title, content, image, user, etc.)

Indexes for fast queries

✅ Storage Bucket

Create a bucket for file uploads (images, thumbnails)

📌 Final .env Example
VITE_APPWRITE_URL="https://fra.cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="69761de40001b7961c38"
VITE_APPWRITE_DATABASE_ID="69761f7c0021e751f7c7"
VITE_APPWRITE_COLLECTION_ID="articles"
VITE_APPWRITE_BUCKET_ID="69763a06002d0fbd0ab0"
VITE_TINYMCE_API_KEY="your_api_key_here"







📌 Step 6: Create Configuration File

📁 src/conf.js

const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf







📌 Step 7: Authentication Service

Create auth.js to manage:

Signup

Login

Logout

Get current user

(All implemented using Appwrite SDK with try–catch handling)






📌 Step 8: Post & File Services

Create config.js including:

📄 Post Services

Create post

Update post

Delete post

Fetch posts

📁 File Services

Upload file

Delete file

Get file preview

(All based on Appwrite documentation)







📌 Step 9: Redux Toolkit Setup

Create:

store.js

authSlice.js

Then:

Wrap app with Redux Provider

Add Header & Footer components

Configure Tailwind CSS







📌 Step 10: Reusable UI Components

Create:

Input.jsx

Button.jsx

Logo.jsx

LogoutBtn.jsx

Container layout component








📌 Step 11: Forms & Pages

Using React Hook Form, build:

Login page

Signup page

PostCard component

Select dropdown

Auth layout wrapper








📌 Step 12: Debug & Final Integration

✔ Fix environment imports
✔ Test authentication flow
✔ Validate CRUD operations
✔ Ensure file uploads work
✔ Clean UI responsiveness

✅ Result

A complete full stack React application with:

Authentication

Database CRUD

File storage

Rich text editor

Redux state management

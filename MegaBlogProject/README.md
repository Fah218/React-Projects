THIS IS A NEW MEGA REACT PROJECT


STEPS TO MAKE:

Step 1:

INSTALLED DEPENDENCIES :

React-redux
React-router-dom
React-redux-toolkit
Appwrite
Tinymce-react
html-react-parser
react-hook-form

Step 2:

create .env -> VITE_SOME_KEY=123

To import ->  console.log(import.meta.env.VITE_SOME_KEY)


Step 3:
create rest for .env -
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""


Step 4:

Setup Appwrite - create account and create project 

Add - API endpoint and Project id



Step 5:

:Create Database - add database id 
:Create Collection (Table) - columns and indexes
:Create Bucket - Bucket Id



Final Update:::

VITE_APPWRITE_URL="https://fra.cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="69761de40001b7961c38"
VITE_APPWRITE_DATABASE_ID="69761f7c0021e751f7c7"
VITE_APPWRITE_COLLECTION_ID="articles"
VITE_APPWRITE_BUCKET_ID="69763a06002d0fbd0ab0"



Step 6 :


Set Conf.js file in src :  
-  Added const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID)

}

export default conf




Step 7:

Learn authentication service with appwrite:

Adjust new file auth.js -  Add all the code for signup,login,logout,useraccount (even use in future)



Step 8:

create file config.js

Added all post related and file related srvices in config.js

-Post services: create ,delete,update,get post 
-File services:  upload,delete,Getfile Preview

-All these services presence after reading documentation present at appwrite with code (try & catch method use)




Step 9:

Set up redux toolkit:
-Create store.js & authSlice.js and sstore.js 
-Create components Header & Footer
-Set up Tailwind 

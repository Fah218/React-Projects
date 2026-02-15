# How to Connect to MongoDB Atlas

This guide explains how to set up a MongoDB Atlas cluster and connect it to your application.

## Step 1: Create a MongoDB Atlas Account

1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Sign up for an account if you don't have one.

## Step 2: Create a Cluster

1.  Once logged in, click **Build a Database**.
2.  Select the **M0** (Free) tier.
3.  Choose a provider (AWS, Google Cloud, or Azure) and a region close to you.
4.  Click **Create Cluster**.

## Step 3: Create a Database User

1.  In the **Security** section on the left sidebar, click **Database Access**.
2.  Click **Add New Database User**.
3.  Choose **Password** authentication.
4.  Enter a **Username** and **Password** (make sure to remember this password).
5.  In **Database User Privileges**, select **Read and write to any database**.
6.  Click **Add User**.

## Step 4: Configure Network Access

1.  In the **Security** section, click **Network Access**.
2.  Click **Add IP Address**.
3.  Click **Allow Access from Anywhere** (0.0.0.0/0).
    *   *Note: For production, you should whitelist only your server's IP.*
4.  Click **Confirm**.

## Step 5: Get Connection String

1.  Go back to the **Deployment** -> **Database** section.
2.  Click **Connect** on your cluster.
3.  Select **Connect your application**.
4.  Make sure the **Driver** is set to **Node.js** and the version is correct (usually latest).
5.  Copy the connection string. It will look something like this:
    `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Connect to Your Application

1.  Open your project in your code editor.
2.  Navigate to the `server` directory.
3.  Create a file named `.env` if it doesn't already exist.
4.  Add the following line to the `.env` file:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/recipe-book?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret_here
    PORT=5000
    ```

5.  Replace `<username>` with your database username.
6.  Replace `<password>` with your database password.
    *   *Important: Do not include `<` or `>` characters.*
7.  Replace `recipe-book` (after `.net/` and before `?`) with the name of the database you want to use. You can name it whatever you want (e.g., `recipe-app`, `test-db`).

## Running the Server

1.  Open a terminal in the `server` directory.
2.  Run `npm install` to install dependencies if you haven't already.
3.  Run `npm run start` or `npx nodemon index.js` to start the server.
4.  You should see "MongoDB Connected" in the console if the connection is successful.

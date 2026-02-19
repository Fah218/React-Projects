# Deploying MegaBlogProject to Vercel

This guide will walk you through deploying your React frontend to Vercel and connecting it to your Appwrite backend.

## Prerequisites

1.  **GitHub Repository**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you haven't already.
3.  **Appwrite Project**: You should have your Appwrite project running and accessible.

## Step 1: Push to GitHub

If you haven't pushed your latest code, run these commands in your terminal:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## Step 2: Deploy on Vercel

1.  Go to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `MegaBlogProject` repository from GitHub.
4.  **Configure Project**:
    *   **Framework Preset**: Select `Vite`.
    *   **Root Directory**: leave as `./` (default).
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
5.  **Environment Variables** (CRITICAL STEP):
    *   Expand the **"Environment Variables"** section.
    *   You need to add the variables from your local `.env` file here.
    *   Open your local `.env` file and copy the values.
    *   Add them one by one:
        *   **Key**: `VITE_APPWRITE_URL` | **Value**: (Your Appwrite API Endpoint)
        *   **Key**: `VITE_APPWRITE_PROJECT_ID` | **Value**: (Your Project ID)
        *   Make sure to add any other variables present in your `.env` file (e.g., database ID, collection IDs).
6.  Click **"Deploy"**.

## Step 3: Configure Appwrite (CRITICAL STEP)

Once Vercel finishes deploying, you will get a live URL (e.g., `https://megablogproject.vercel.app`). Your app might not work yet because Appwrite blocks requests from unknown domains.

1.  Copy your **Vercel Domain** (e.g., `megablogproject.vercel.app`).
2.  Go to your **Appwrite Console**.
3.  Navigate to your Project -> **Settings** -> **"Web" Platform** (or "Overview" -> "Platforms").
    *   If you already have a Web platform, edit it.
    *   If not, add a new Web Platform.
4.  **Add/Update Hostname**:
    *   Paste your Vercel domain **without** `https://` (e.g., `megablogproject.vercel.app`).
    *   You can add multiple domains (e.g., `localhost` for dev and `megablogproject.vercel.app` for prod).
5.  Save the changes.

## Troubleshooting

### "404 Not Found" on Refresh
If you refresh a page like `/login` and get a 404 error, ensure your `vercel.json` file is in the root directory with the following content (you should already have this):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Appwrite Connection Error
If you see errors in the console like "Network Error" or "Access Denied":
1.  **Check Env Vars**: Go to Vercel Project Settings -> Environment Variables. Ensure `VITE_APPWRITE_URL` and `VITE_APPWRITE_PROJECT_ID` are correct.
    *   *Note*: If you update variables, you must **Redeploy** for changes to take effect (Go to Deployments -> Redeploy).
2.  **Check Appwrite Platform**: Ensure the Vercel domain is exactly correct in Appwrite Platform settings (no trailing slashed, no http/https).

### Blank White Screen
1.  Inspect the browser console (Right Click -> Inspect -> Console).
2.  Errors usually indicate missing environment variables or a build crash.

# 🔧 Debugging & Testing Guide

## Changes Made (Step 2)

### 1. **Added Debugging Logs**
To help identify issues with:
- Form submission in PostForm
- User data availability
- Author verification in Post page

### 2. **Fixed Home Page**
- Now shows only the current user's posts (not all users' posts)
- Consistent with "All Posts" page behavior

### 3. **Enhanced Error Handling**
- Added alerts for failed post creation
- Added alerts for failed image upload
- Better error messages in console

---

## 🧪 Testing Instructions

### **Step 1: Open Browser Console**
1. Open your browser
2. Press `F12` or `Cmd+Option+I` (Mac) to open Developer Tools
3. Go to the "Console" tab
4. Keep it open while testing

### **Step 2: Test Adding a Post**

1. **Login as User A**
2. **Go to "Add Post"**
3. **Fill in the form:**
   - Title: "My First Post"
   - Content: Some text
   - Image: Upload an image
   - Status: active
4. **Click Submit**
5. **Check Console for these logs:**
   ```
   Form submitted with data: {...}
   Current userData: {...}
   Creating new post...
   File uploaded: {...}
   Creating post with userId: [USER_ID]
   Post created: {...}
   ```

### **Step 3: Check What Happens**

#### ✅ **If Post Creation Works:**
- You'll be redirected to the post page
- Check console for "Post created" message

#### ❌ **If Post Creation Fails:**
Check console for error messages:

**Error 1: "User data not available!"**
- **Problem:** User not properly logged in
- **Solution:** Logout and login again

**Error 2: "Failed to upload file"**
- **Problem:** Image upload failed
- **Solution:** Check image size (should be < 5MB), check Appwrite bucket permissions

**Error 3: "Failed to create post"**
- **Problem:** Database write failed
- **Solution:** Check Appwrite collection permissions

### **Step 4: Test Edit/Delete Buttons**

1. **Click on your post** (the one you just created)
2. **Check Console** for:
   ```
   === Author Check Debug ===
   Post userId: [YOUR_USER_ID]
   Current user $id: [YOUR_USER_ID]
   Are they equal? true
   isAuthor: true
   ========================
   ```
3. **Check if Edit/Delete buttons appear** in the top-right corner

#### ❌ **If Buttons Don't Appear:**
Check console output:
- If `Are they equal? false` → User IDs don't match (old posts from different account)
- If `isAuthor: false` → Authorization check failed

### **Step 5: Test User Isolation**

1. **As User A:** Create 2-3 posts
2. **Logout**
3. **Sign up as User B**
4. **Go to Home page** → Should see "Login to read posts" or empty
5. **Create 1-2 posts as User B**
6. **Go to "All Posts"** → Should see ONLY User B's posts
7. **Logout and login as User A**
8. **Go to "All Posts"** → Should see ONLY User A's posts

---

## 🐛 Common Issues & Solutions

### Issue 1: "Submit button does nothing"
**Check:**
- Console for error messages
- Network tab for failed requests
- User is logged in (check Redux state)

**Solution:**
```javascript
// In browser console, check:
console.log(store.getState().auth.userData)
// Should show user object with $id
```

### Issue 2: "Edit/Delete buttons not showing on MY posts"
**Check:**
- Console for "Author Check Debug" logs
- User IDs match exactly

**Possible Causes:**
- Posts were created with a different user account
- User logged out and back in (session changed)

**Solution:**
- Delete old posts and create new ones
- Or update userId in Appwrite database manually

### Issue 3: "Can see other users' posts"
**Check:**
- Which page you're on (Home vs All Posts)
- Console for Query being sent

**Current Behavior:**
- **Home page:** Shows only YOUR posts
- **All Posts page:** Shows only YOUR posts

---

## 📊 What to Send Me

If issues persist, please send:

1. **Console logs** when submitting a post
2. **Console logs** when viewing a post (Author Check Debug)
3. **Screenshots** of:
   - The form when you click Submit
   - The post page (showing if buttons appear or not)
   - The console errors (if any)

4. **Answer these questions:**
   - Does the form submit? (Does anything happen?)
   - Do you see any alerts/errors?
   - Are you using the same account that created the posts?

---

## 🎯 Expected Console Output

### When Creating a Post:
```
Form submitted with data: {title: "...", slug: "...", content: "...", status: "active", image: FileList}
Current userData: {$id: "697afe3b001826358809", name: "...", email: "..."}
Creating new post...
File uploaded: {$id: "...", name: "...", ...}
Creating post with userId: 697afe3b001826358809
Post created: {$id: "...", title: "...", userId: "697afe3b001826358809", ...}
```

### When Viewing Your Own Post:
```
=== Author Check Debug ===
Post userId: 697afe3b001826358809
Current user $id: 697afe3b001826358809
Are they equal? true
isAuthor: true
========================
```

### When Viewing Someone Else's Post:
```
=== Author Check Debug ===
Post userId: 697e0d770022e6e41bc7
Current user $id: 697afe3b001826358809
Are they equal? false
isAuthor: false
========================
```

---

## ✅ Next Steps

1. **Refresh your browser** (clear cache if needed)
2. **Open console** (F12)
3. **Try creating a new post**
4. **Copy all console logs** and send them to me
5. **Tell me exactly what happens** (or doesn't happen)

This will help me identify the exact issue!

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Only the original author can edit/delete their posts
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Debug logging
    if (post && userData) {
        console.log("=== Author Check Debug ===");
        console.log("Post userId:", post.userId);
        console.log("Current user $id:", userData.$id);
        console.log("Are they equal?", post.userId === userData.$id);
        console.log("isAuthor:", isAuthor);
        console.log("========================");
    }

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (!post) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            } else {
                alert("Failed to delete post. Please try again.");
            }
        }).catch((error) => {
            console.error("Delete error:", error);
            alert("Error deleting post: " + error.message);
        });
    };

    return post ? (
        <div className="py-16 bg-black min-h-screen">
            <Container>
                <div className="max-w-3xl mx-auto">

                    {/* Featured Image */}
                    <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-h-[420px] object-cover"
                        />
                    </div>

                    {/* Title + Actions */}
                    <div className="flex items-start justify-between mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            {post.title}
                        </h1>

                        {isAuthor && (
                            <div className="flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button
  className="w-32 h-10 flex items-center justify-center 
             bg-green-600 hover:bg-green-700 
             text-white text-sm 
             rounded-lg transition"
>
  Edit
</button>

                                </Link>

                                <button
                                    onClick={deletePost}
                                    className="w-32 h-10 flex items-center justify-center 
           bg-red-600 hover:bg-red-700 
           text-white text-sm 
           rounded-lg transition"

                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg">
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}
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
        <div className="py-12 min-h-screen w-full flex justify-center">
            <Container>
                <div className="max-w-4xl mx-auto glass-card overflow-hidden">
                    <div className="relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-96 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-600/50 transition-all duration-300 hover:scale-105">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
                        <div className="prose prose-invert prose-red max-w-none text-gray-300">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
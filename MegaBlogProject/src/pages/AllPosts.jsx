import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            // Fetch only posts created by the current user
            appwriteService.getPosts([
                Query.equal("userId", userData.$id)
            ]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
    }, [userData])

    return (
        <div className='w-full py-8 min-h-screen'>
            <Container>
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    All <span className="text-red-500">Posts</span>
                </h1>
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="glass-card max-w-2xl mx-auto p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">No posts yet</h2>
                            <p className="text-gray-400 text-lg mb-6">
                                You haven't created any posts. Click "Add Post" to create your first post!
                            </p>
                            <a
                                href="/add-post"
                                className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
                            >
                                Create Your First Post
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className='animate-fadeIn'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts
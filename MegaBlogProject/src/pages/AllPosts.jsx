import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            setLoading(true);
            appwriteService.getPosts([
                Query.equal("userId", userData.$id)
            ]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            }).finally(() => {
                setLoading(false);
            })
        } else {
            setLoading(false);
        }
    }, [userData])

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex flex-col items-center animate-fadeIn">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-white text-xl font-semibold animate-pulse">Loading amazing stories...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full py-12 min-h-screen'>
            <Container>
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-center justify-center text-center animate-slideIn w-full">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-4 drop-shadow-sm">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Stories</span>
                    </h1>
                    <p className="text-gray-400 text-center text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
                        Manage, read, and share your creative thoughts with the world. <br className="hidden sm:block" /> Here is the collection of all your published posts.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl animate-fadeIn" style={{ background: 'rgba(26, 26, 26, 0.4)' }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto p-8">
                            <div className="w-24 h-24 mb-6 rounded-full bg-red-500/10 flex items-center justify-center transform transition-transform hover:scale-110 duration-300">
                                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">No stories yet?</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                You haven't started your journey yet. Click "Create Your First Story" to put your thoughts into words and share them with the community!
                            </p>
                            <Link
                                to="/add-post"
                                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl hover:from-red-500 hover:to-orange-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:-translate-y-1"
                            >
                                <span className="mr-2">Create Your First Story</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {posts.map((post, index) => (
                            <div
                                key={post.$id}
                                className='animate-fadeIn'
                                style={{ animationFillMode: 'both', animationDelay: `${index * 100}ms` }}
                            >
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
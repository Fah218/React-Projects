import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function Home() {
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

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-8 w-full max-w-2xl glass-card">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                Welcome to <span className="text-red-500">BlogSpace</span>
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Login to start creating and reading amazing blog posts
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    My <span className="text-red-500">Posts</span>
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='animate-fadeIn'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
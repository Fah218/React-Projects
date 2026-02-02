import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className='glass-card h-full flex flex-col overflow-hidden group'>
        <div className='w-full overflow-hidden rounded-t-xl'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110'
          />
        </div>
        <div className='p-4 flex-1 flex flex-col'>
          <h2 className='text-xl font-bold text-white group-hover:text-red-500 transition-colors duration-300 line-clamp-2'>
            {title}
          </h2>
          <div className='mt-auto pt-4'>
            <span className='text-sm text-red-500 font-medium'>Read More →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}


export default PostCard
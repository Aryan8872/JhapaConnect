import PostForm from '@/components/forms/PostForm';
import FileUploader from '@/components/shared/FileUploader';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z,ZodType } from 'zod';


const CreatePost = () => {


  return (
    //form parent
    <div>
    <div className="common-container md: w-full">
      <div className="max-w-5xl flex items-center flex-start gap-3 justify-start w-full">
        <img
          src="/assets/icons/add-post.svg"
          width={36}
          height={36}
          alt="add"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
      </div>

      <PostForm />
    </div>
  </div>
  
  )
}

export default CreatePost

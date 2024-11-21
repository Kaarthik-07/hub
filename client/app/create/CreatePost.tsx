"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TipTapEditor from "../components/TipTap";
import { Text, Video } from "lucide-react"; 
import Image from "next/image"; 
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const {data:session} = useSession();
  const [activeTab, setActiveTab] = useState("post");
  const [imageurl, setImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState(""); // State to store the content from TipTap editor

  const { register, handleSubmit, formState: { isSubmitting }, setValue } = useForm<FormValues>();

  interface FormValues {
    title: string;
    tags: string;
    content: string;
  }

  const onSubmit = async (values: FormValues) => {
    const postData = {
      ...values,
      user_id: session?.user?.name,
      imageurl: imageurl || "",
      content: JSON.stringify(content), 
    };

    try {
      const response = await fetch('http://localhost:6969/users/create_post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(postData),
      });

      if (!response.ok) throw new Error('Failed to submit post');

      const result = await response.json();
      console.log('Post created:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEditorChange = (newContent: string) => {
    setContent(newContent); 
    setValue("content", newContent); 
    console.log(newContent)
  };

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-y-5 p-5">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 mb-4 border-b">
          <button
            className={`flex items-center justify-center text-lg font-semibold py-2 ${
              activeTab === 'post'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('post')}
          >
            <Text className="h-4 w-4 mr-2" /> Post
          </button>
          <button
            className={`flex items-center justify-center text-lg font-semibold py-2 ${
              activeTab === 'image'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('image')}
          >
            <Video className="h-4 w-4 mr-2" /> Image & Video
          </button>
        </div>

        {activeTab === 'post' && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-4"
            noValidate
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                {...register('title')}
                placeholder="Enter the title"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                {...register('tags')}
                placeholder="Example tags:--> typescript, nodejs"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>

            {/* TipTap Editor */}
            <TipTapEditor onChange={handleEditorChange} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-black hover:bg-black/80 text-white font-semibold rounded-lg disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}

        {activeTab === 'image' && (
          <div className="text-center p-4">
            <p className="text-gray-500">Upload Image or Video</p>
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload File</label>
              <input
                type="file"
                accept="image/*,video/*"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              {imageurl && (
                <div className="mt-4">
                  <Image
                    src={imageurl}
                    alt="Uploaded Preview"
                    className="mt-2 max-w-full h-auto border rounded-md"
                    layout="responsive"
                    width={700}
                    height={475}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;

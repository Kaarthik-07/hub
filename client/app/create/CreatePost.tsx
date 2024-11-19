"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Text, Video } from "lucide-react";

const CreatePost = () => {
  const [activeTab, setActiveTab] = useState("post");
  const [imageurl, setImageUrl] = useState<null | string>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      imageurl: "",
    },
  });

  const { handleSubmit, register, formState: { isSubmitting } } = form;

  const onSubmit = async (values: { title: string; content: string; tags: string; imageurl: string }) => {
    try {
      const postData = {
        ...values,
        imageurl: imageurl || "",
      };

      const response = await fetch("http://localhost:6969/users/create_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Failed to submit post");

      const result = await response.json();
      console.log("Post created:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-y-5 p-5">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 mb-4 border-b">
          <button
            className={`flex items-center justify-center text-lg font-semibold py-2 ${
              activeTab === "post"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("post")}
          >
            <Text className="h-4 w-4 mr-2" /> Post
          </button>
          <button
            className={`flex items-center justify-center text-lg font-semibold py-2 ${
              activeTab === "image"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("image")}
          >
            <Video className="h-4 w-4 mr-2" /> Image & Video
          </button>
        </div>

        {activeTab === "post" && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-4"
            noValidate
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register("title")}
                placeholder="Enter the title"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                {...register("tags")}
                placeholder="Example tags:--> typescript, nodejs"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                {...register("content")}
                rows={4}
                placeholder="Enter the content"
                className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-black hover:bg-black/80 text-white font-semibold rounded-lg disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}

        {activeTab === "image" && (
          <div className="text-center p-4">
            <p className="text-gray-500">Upload Image or Video</p>
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
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
                  <p className="text-gray-700">Preview:</p>
                  <img
                    src={imageurl}
                    alt="Uploaded Preview"
                    className="mt-2 max-w-full h-auto border rounded-md"
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

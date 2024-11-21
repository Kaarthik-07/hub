'use client'
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostType {
  post_id: string;
  created_at: string;
  total_views: number;
  user_id: string;
  user_image?: string;
  title: string;
  content: string;
  imageurl?: string;
  tags?: string;
}

const Post = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:6969/users/get_all_post', {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.post);
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
    <div className="mt-7 ml-2 mr-3 md:ml-8 md:mr-10 card_grid">
      {posts.length > 0 ? (
        posts.map((post) => (
          <li key={post.post_id} className="opensource-card ">
            <div className="flex-between">
              <p className="opensource_card_date">{new Date(post.created_at).toLocaleString()}</p>
              <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary" />
                <span className="text-16-medium">{post.total_views}</span>
              </div>
            </div>

            <div className="flex-between mt-5 gap-5">
              <div className="flex-1">
                <Link href={`/user/${post.user_id}`}>
                  <p className="text-16-medium line-clamp-1">{post.user_id}</p>
                </Link>
                <Link href={`/startup/${post.post_id}`}>
                  <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
                </Link>
              </div>
              <Link href={`/user/${post.user_id}`}>
                {post.user_image ? (
                  <Image
                    src={post.user_image}
                    alt={post.user_id || "Author"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    <span>{post.user_id?.charAt(0) || "?"}</span>
                  </div>
                )}
              </Link>
            </div>

            <Link href={`/startup/${post.post_id}`}>
              <p className="opensource-card_desc" 
              dangerouslySetInnerHTML={{ __html: post.content }}>
               </p>
              {post.imageurl ? (
                <Image
                  src={post.imageurl}
                  alt="Post Image"
                  className="opensource-card_img"
                  width={300}
                  height={200}
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </Link>

            <div className="flex-between gap-3 mt-5">
              <Link href='/'>
                <p className="text-16-medium">{post.tags}</p>
              </Link>
              <Button className="opensource-card_btn" asChild>
                <Link href={`/startup/${post.post_id}`}>Details</Link>
              </Button>
            </div>
          </li>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
    </>
  );
};

export default Post;

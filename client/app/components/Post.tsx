
'use client';

import { useEffect, useState } from "react";
import OpenSourceCard from "./OpenSourceCard";
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

const Post = ({ searchQuery }: { searchQuery: string }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:6969/users/get_all_post', {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.post);
        setFilteredPosts(data.post); // Initialize with all posts
      } catch (err) {
        setError("Failed to load posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && String(post.tags).toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts); // Reset to all posts if no query
    }
  }, [searchQuery, posts]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className="mt-7 card_grid">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <OpenSourceCard key={post.post_id} post={post} />
        ))
      ) : (
        <p className="no-results">No posts available</p>
      )}
    </ul>
  );
};

export default Post;

'use client';

import { useSearchParams } from "next/navigation"; // Import the hook
import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import CreateUser from "../components/CreateUser";
import OpenSourceCard from "../components/OpenSourceCard";
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

export default function Home() {
  const searchParams = useSearchParams(); // Use the hook to access search params
  const query = searchParams?.get("query") || ""; // Get the 'query' parameter

  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:6969/users/get_all_post", {
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
    if (query) {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.tags && String(post.tags).toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts); // Reset to all posts if no query
    }
  }, [query, posts]);

  return (
    <main>
      <section className="main_container">
        <h1 className="heading">
          Pitch your projects, <br />
          Dive into OpenSource
        </h1>
        <p className="sub-heading !max-w-3xl">
          Post Projects, Vote on Ideas, and get Noticed in Community
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section-container mx-auto">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Latest Projects"}
        </p>

        {loading ? (
          <div>Loading posts...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className="card_grid sm:mt-4 md:mt-7">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <OpenSourceCard key={post.post_id} post={post} />
              ))
            ) : (
              <p className="no-results">No posts available</p>
            )}
          </ul>
        )}
      </section>

      <CreateUser />
    </main>
  );
}

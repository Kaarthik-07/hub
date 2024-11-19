import CreateUser from "../components/CreateUser";
import OpenSourceCard from "../components/OpenSourceCard";
import SearchForm from "../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
const posts = [
  {
    _createdAt: "2024-11-16",
    views: 44,
    author: { _id: 1 },
    description: "This is an initiative to open source",
    image: "/visuals.webp",
    category: "Typescript",
    title: "open source project",
  },
  {
    _createdAt: "2024-11-17",
    views: 120,
    author: { _id: 2 },
    description: "A beginner's guide to React",
    image: "https://imgs.search.brave.com/DXyrqk1lnVF4ArRrR0YcbCogVVe2eDKW_EVwONzR7B4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvRnJl/ZVBob3Rvcy9GcmVl/LVBob3RvLTc0MHg0/OTItMTc0NDkxNTMz/My5qcGc",
    category: "React",
    title: "Intro to React",
  },
  {
    _createdAt: "2024-11-18",
    views: 35,
    author: { _id: 3 },
    description: "Understanding Python decorators for better code",
    image: "https://imgs.search.brave.com/0PCuR1w4iwRruQXkauU4IU9-vIfGyBKWB_kpIhUvJ_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGFubmVkLXNhbmQt/ZHVuZXMtc3Vycm91/bmRlZC1hbi1vcGVu/LXJlc2Vydm9pci5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w",
    category: "Python",
    title: "Mastering Python Decorators",
  },
  {
    _createdAt: "2024-11-19",
    views: 56,
    author: { _id: 4 },
    description: "How to optimize web performance in JavaScript",
    image: "https://imgs.search.brave.com/Zikx7bjPHJO0WCGjHzs-RJoLE0cLb3N8Sygh4tstQ2w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzE3Lzg5Lzg3/LzM2MF9GXzgxNzg5/ODc0OV9sMThvanQx/Rk9JcWdwWmZrV2JO/dTZGYmtrbVVBbm1U/ZS5qcGc",
    category: "JavaScript",
    title: "Optimizing JavaScript for Speed",
  },
  {
    _createdAt: "2024-11-20",
    views: 89,
    author: { _id: 5 },
    description: "An introduction to machine learning with TensorFlow",
    image: "https://imgs.search.brave.com/3mgXcM4JuLE75iioV_ohNdkQUj36VeVa7PC4sgJy-e4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzYwLzkyLzIz/LzM2MF9GXzk2MDky/MjMyNV9Renp0emlr/cXllU3dsQWxxUFd5/NkZjSzdpOTRiV2t2/bi5qcGc",
    category: "Machine Learning",
    title: "Getting Started with TensorFlow",
  },
  {
    _createdAt: "2024-11-21",
    views: 102,
    author: { _id: 6 },
    description: "Building scalable systems with microservices",
    image: "https://imgs.search.brave.com/LjWstTQLLjSEUy3qxp_S4pSEDQuiik8D53XqmACn8RM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bGVuc2JhbGwteWVs/bG93LWFuZC1vcmFu/Z2UtbGlnaHRzLmpw/Zz93aWR0aD0xMDAw/JmZvcm1hdD1wanBn/JmV4aWY9MCZpcHRj/PTA",
    category: "Architecture",
    title: "Microservices Architecture Explained",
  },
];
    const query = (await searchParams).query;

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
      <section className="section-container">
        <p className="text-30-semibold">
          {query
            ? `Search results for "${query}"`
            : "Latest Projects"}
        </p>
        {/* OpenSourceCard Layout */}
            <ul className="mt-7 ml-2 mr-3 md:ml-8 md:mr-10 card_grid">
              {posts?.length > 0 ? (
                posts.map((post, index) => (
                  <OpenSourceCard key={index} post={post} />
                ))
              ) : (
                <p className="no-results">No OpenSource found</p>
              )}
            </ul>
            <CreateUser />
      </section>
    </main>
  );
}
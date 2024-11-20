import CreateUser from "../components/CreateUser";
import SearchForm from "../components/SearchForm";
import Post from "../components/OpenSourceCaed";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
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
          {query ? `Search results for "${query}"` : "Latest Projects"}
        </p>
          <div>
          <Post />
          </div>

        <CreateUser />
      </section>
    </main>
  );
}

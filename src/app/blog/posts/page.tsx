import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";
import { connectToDB } from "@/app/lib/data";
export default async function Page() {
  const client = await connectToDB();

  return (
    <>
    {client&& <>Connected to database</>}
      <h1 className="text-4xl text-purple-800">Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}

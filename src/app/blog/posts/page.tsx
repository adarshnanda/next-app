import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";

export default function Page() {
  return (
    <>
      <h1 className="text-4xl text-purple-800">Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}

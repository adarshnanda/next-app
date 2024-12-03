import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";

export default function Page({ params }:{params: {id: string}}) {
  const post = posts.find((post) => post.id === params.id);

  if (!post) {
    return <div>Post not found</div>;
  }
  console.log(post);
  return (
    <>
      <h1 className="text-4xl text-purple-800">Posts</h1>
      <Post {...post} />
    </>
  );
}

import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const post = posts?.find(post => post.id === id);

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

import Post from "@/app/ui/components/posts/Post";
import { getPosts } from "@/app/lib/data";
import { Post as postType } from "@/app/lib/definition";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const posts: postType[] = await getPosts();
  const post = posts?.find(post => post.id === id);

  if (!post) {
    notFound();
  }
  console.log(post);
  return (
    <>
      <h1 className="text-4xl text-purple-800">Posts</h1>
      <Post {...post} />
    </>
  );
}

import Post from "@/app/ui/components/posts/Post";
import { getPosts } from "@/app/lib/data";
import { Post as PostType } from "@/app/lib/definition";
export default async function Page() {
  const posts: PostType[] = await getPosts();

  return (
    <>
      <h1 className="text-4xl text-purple-800">Posts</h1>
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} title={post.title} content={post.content} date={post.date} />
      ))}
    </>
  );
}

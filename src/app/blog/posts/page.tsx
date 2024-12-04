import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import Post from "@/app/ui/components/posts/Post";
import { getPosts } from "@/app/lib/data";
import { Post as PostType } from "@/app/lib/definition";
export default async function Page() {
  const posts: PostType[] = await getPosts();

  return (
    <>
      <Link href="/blog/post/new">
        <Button className="outline outline-1  border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded">
          New +
        </Button>
      </Link>

      <h1 className="text-4xl text-purple-800">Posts</h1>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
        />
      ))}
    </>
  );
}

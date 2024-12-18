import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth.config";

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM posts ORDER BY date DESC LIMIT 2;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  const payload = await request.json();
  const { id, title, content, date, author } = payload;

  try {
  if (!session){
    return NextResponse.json({ error: 'User Not Authenticated' }, { status: 401 });
    }
      // SQL query to insert a new post
      await sql`INSERT INTO posts (id, author, title, content, date) VALUES (${id}, ${author}, ${title}, ${content}, ${date});`;
    return NextResponse.json(
      { message: "Post successfully inserted" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

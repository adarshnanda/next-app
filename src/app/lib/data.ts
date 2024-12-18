import { createClient } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@vercel/postgres";

import { Post } from "../lib/definition";

export async function connectToDB() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log("Connected to database");
      return client;
    }
  } catch (error) {
    console.error("Error connecting to database", error);
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    // This noStore function is used to prevent caching of the query results
    noStore();
    const data: { rows: Array<Post> } = await sql`SELECT * FROM posts`;
    console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Error getting posts", error);
    return [];
  }
}

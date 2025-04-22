import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      })
        // execute: () => ({
        //   from: () => [],
        // }),
    };
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
 // const db = drizzle({client: queryClient});

  //const result = await db.execute('select * from advocates');

  return db
  //return db;
};

export default setup();

import { MongoClient, Db } from "mongodb";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://milikifleyesus_db_user:TylJmCXL9KRk1smK@millipro.riz7n5i.mongodb.net/";
const MONGODB_DB = process.env.MONGODB_DB || "portfolio";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
  }

  try {
    await cachedClient.connect();
    cachedDb = cachedClient.db(MONGODB_DB);
    console.log("Connected to MongoDB Atlas");
    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log("MongoDB connection closed");
  }
}

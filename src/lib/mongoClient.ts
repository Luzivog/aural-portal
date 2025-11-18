import { MongoClient } from "mongodb";

const mongoLink = process.env.MONGO_LINK;
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

if (!mongoLink || !mongoUsername || !mongoPassword) {
  throw new Error("MongoDB credentials are not set");
}

const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoLink}`;

export const mongoClient = new MongoClient(uri);

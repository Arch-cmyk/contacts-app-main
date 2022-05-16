import mongoose from "mongoose";
import { USER_NAME, PASSWORD } from "../config";

const username = encodeURIComponent(USER_NAME);
const password = encodeURIComponent(PASSWORD);
const dataBaseName = "contacts-app";

const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.ig67n.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectMongo;

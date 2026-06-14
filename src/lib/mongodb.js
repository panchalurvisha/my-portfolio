import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('Please add MONGO_URI to your .env file');
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// In development, reuse the client across hot reloads to avoid
// exhausting database connections.
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a fresh client per serverless instance.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

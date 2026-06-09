import { QdrantClient } from "@qdrant/js-client-rest";

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

let client: QdrantClient | null = null;

export function getQdrantClient() {
  if (client) return client;

  if (!QDRANT_URL) {
    throw new Error("QDRANT_URL is not defined in environment variables");
  }

  client = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
  });

  return client;
}

export const COLLECTION_NAME = "kb_documents";

export async function ensureCollection() {
  const qdrant = getQdrantClient();
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some((c) => c.name === COLLECTION_NAME);

  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 768, // Gemini embedding-004 size
        distance: "Cosine",
      },
    });
  }
}

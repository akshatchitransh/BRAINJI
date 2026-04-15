import { pipeline } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  // ✅ correct
  const namespace = pc.index("tweets-index","https://tweets-index-a5igeas.svc.aped-4627-b74a.pinecone.io");

  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const text = "India is growing fast 🚀";

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  const embedding = Array.from(output.data);

  console.log("Embedding length:", embedding.length);

  // ✅ FINAL FIX
   await namespace.upsert({
    records: [
      {
        id: "tweet-1",
        values: embedding,
        metadata: { text },
      },
    ],
  });

  console.log("✅ Stored successfully");
}

run();
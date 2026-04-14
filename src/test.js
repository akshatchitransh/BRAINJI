import { pipeline } from "@xenova/transformers";

async function run() {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const text = `I'm hiring for the following posts for a new project.
We just raised $285M.

1) Full-stack developer ($2k/m)
2) Business Development Executive ($1.5k/m+ Incentives)
3) Community Manager ($1.2k/month)
4) Moderators ($100/Week)
5) Ambassadors ($200/Week)

Here's what you have to do

- Go to the form below, fill out your info and never hear back from me
- Get ghosted by me in chats after asking for JD
- Like and retweet, and increase my reach, and never get any updates on the roles
- Get into a group, sign up, connect your wallet, register for the waiting list and then we may send you an acknowledgement that your form has been received
- Send me follow-ups every single day and never get seen
- Get ghosted after I tell you to complete a task 
- Follow me, hoping for the job and increase my numbers

Basically, just give me engagement, sign-ups, and everything you have, and I won't even see your texts or forms. That's the new crypto hiring.`;

  // ✅ pooling + normalize directly use kar
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  // ✅ correct way to access embedding
  const embedding = output.data;

  console.log("Embedding length:", embedding.length);
  console.log(Array.from(embedding).slice(0, 10));
  console.log(embedding)
}

run();
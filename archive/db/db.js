//Mongo DB
const { MongoClient } = require("mongodb");
const USER = process.env.DB_USERNAME;
const PASS = process.env.DB_PASS;

async function createListing(client, newListing) {
  const result = await client
    .db("collab-api")
    .collection("conversations")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function main() {
  const uri = `mongodb+srv://${USER}:${PASS}@@kaising1-aya62.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await createListing(client, {
      id: "convo2",
      lastMutation: {
        id: 7,
        createdAt: "Wed May 06 2020 13:54:54 GMT-0700 (Pacific Daylight Time)",
        updatedAt: "Wed May 06 2020 13:54:54 GMT-0700 (Pacific Daylight Time)",
        author: "alice",
        data: { index: 4, text: " big", type: "insert" },
        origin: { alice: 3, bob: 6 },
      },
      text: "The house is lol",
    });

    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

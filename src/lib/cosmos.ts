import { CosmosClient, Container } from "@azure/cosmos";

let _client: CosmosClient | null = null;

export function hasCosmosConfig(): boolean {
  return Boolean(process.env.COSMOS_ENDPOINT && process.env.COSMOS_KEY);
}

function getClient(): CosmosClient {
  if (_client) return _client;

  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;

  if (!endpoint) {
    throw new Error("COSMOS_ENDPOINT environment variable is not set");
  }

  if (!key) {
    throw new Error("COSMOS_KEY environment variable is not set");
  }

  _client = new CosmosClient({ endpoint, key });
  return _client;
}

export function getContainer(): Container {
  const database = process.env.COSMOS_DATABASE || "blog-writer";
  return getClient().database(database).container("published-blogs");
}

import Typesense from "typesense";
export const client = new Typesense.Client({
  nodes: [
    {
      host: 'gazpxuq5k0y1dvjnp-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: 'J6CxKnGFOegjQ44JGwvWQHiNb2B7Yy7r',
  connectionTimeoutSeconds: 10,
});
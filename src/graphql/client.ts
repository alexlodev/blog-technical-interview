import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.PRODUCTION_GRAPHQL_ENDPOINT || "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

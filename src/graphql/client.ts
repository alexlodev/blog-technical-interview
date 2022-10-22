/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import { ApolloClient, InMemoryCache } from "@apollo/client";

/* ––
 * –––– Setup Apollo Client
 * –––––––––––––––––––––––––––––––––– */
console.log("Apollo Client setup");
const uri = process.env.GRAPHQL_ENDPOINT
export const apolloClient = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

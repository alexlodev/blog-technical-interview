/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import { ApolloClient, InMemoryCache } from "@apollo/client";

/* ––
 * –––– Setup Apollo Client
 * –––––––––––––––––––––––––––––––––– */
console.log("Apollo Client setup");
export const apolloClient = new ApolloClient({
  uri: "https://blog-technical-interview.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

// App imports
import { resolvers } from "@graphql/resolvers";
import { typeDefs } from "@graphql/shema";
import connectDb from "@db/config";

/* ––
 * –––– Apollo Server configuration
 * –––––––––––––––––––––––––––––––––– */
const cors = Cors({
  allowMethods: ["GET", "HEAD", "POST"],
  origin: "https://blog-technical-interview.vercel.app/",
  allowHeaders: ["Access-Control-Allow-Origin", "Content-Type"],
});

connectDb();

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer: Promise<void> = server.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
});

import app, { httpServer } from "./index";
import { buildApolloServer } from "./graphql";

const port = process.env.PORT || "8000";

buildApolloServer(app, httpServer);

httpServer.listen(port);
console.log(`Server started at ${port}`);
console.log(`To view playground started at http://localhost:${port}/`);
